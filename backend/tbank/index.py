import json
import os
import hashlib
import requests


def generate_token(params: dict, password: str) -> str:
    """Генерация токена для подписи запроса к Т-Банк API."""
    filtered = {k: v for k, v in params.items() if k not in ("Token", "DATA", "Receipt", "Items")}
    filtered["Password"] = password
    sorted_values = "".join(str(v) for k, v in sorted(filtered.items()))
    return hashlib.sha256(sorted_values.encode("utf-8")).hexdigest()


def init_payment(body: dict) -> dict:
    """Инициализация платежа через Т-Банк и получение ссылки для оплаты."""
    amount = body.get("amount")
    order_id = body.get("orderId")
    description = body.get("description", "Астрологический прогноз StarsBiz")
    customer_email = body.get("email", "")
    customer_phone = body.get("phone", "")

    if not amount or not order_id:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Не указаны amount или orderId"}),
        }

    terminal_key = os.environ["TBANK_TERMINAL_KEY"]
    password = os.environ["TBANK_PASSWORD"]

    params = {
        "TerminalKey": terminal_key,
        "Amount": int(amount) * 100,
        "OrderId": str(order_id),
        "Description": description,
        "SuccessURL": "https://starsbiz.ru/payment/success",
        "FailURL": "https://starsbiz.ru/payment/fail",
    }

    if customer_email:
        params["DATA"] = {"Email": customer_email, "Phone": customer_phone}

    params["Token"] = generate_token(params, password)

    response = requests.post(
        "https://securepay.tinkoff.ru/v2/Init",
        json=params,
        timeout=30,
    )
    result = response.json()

    if not result.get("Success"):
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": result.get("Message", "Ошибка создания платежа")}),
        }

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            "paymentUrl": result["PaymentURL"],
            "paymentId": result["PaymentId"],
        }),
    }


def get_status(body: dict) -> dict:
    """Проверка статуса платежа по PaymentId через Т-Банк API."""
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


def handler(event: dict, context) -> dict:
    """Приём платежей Т-Банк: создание платежа (action=init, по умолчанию) и проверка статуса (action=status)."""
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token, X-Session-Id",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    action = body.get("action", "init")

    if action == "status":
        return get_status(body)

    return init_payment(body)
