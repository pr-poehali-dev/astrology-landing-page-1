import json
import os
import hashlib
import requests

def generate_token(params: dict, password: str) -> str:
    """Генерация токена для подписи запроса к Т-Банк API."""
    filtered = {k: v for k, v in params.items() if k != "Token"}
    filtered["Password"] = password
    sorted_values = "".join(str(v) for k, v in sorted(filtered.items()))
    return hashlib.sha256(sorted_values.encode("utf-8")).hexdigest()

def handler(event: dict, context) -> dict:
    """Проверка статуса платежа по PaymentId через Т-Банк API."""
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    payment_id = body.get("paymentId")

    if not payment_id:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Не указан paymentId"}),
        }

    terminal_key = os.environ["TBANK_TERMINAL_KEY"]
    password = os.environ["TBANK_PASSWORD"]

    params = {
        "TerminalKey": terminal_key,
        "PaymentId": str(payment_id),
    }
    params["Token"] = generate_token(params, password)

    response = requests.post(
        "https://securepay.tinkoff.ru/v2/GetState",
        json=params,
        timeout=30,
    )
    result = response.json()

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            "status": result.get("Status"),
            "success": result.get("Success", False),
            "orderId": result.get("OrderId"),
        }),
    }
