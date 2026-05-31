import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту владельца через Яндекс SMTP."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    email = body.get('email', '').strip()
    phone = body.get('phone', '').strip()
    comment = body.get('comment', '').strip()

    if not name or not email:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и email обязательны'})
        }

    smtp_user = 'vla-rastegaev@yandex.ru'
    smtp_password = os.environ['YANDEX_SMTP_PASSWORD']
    to_email = 'vla-rastegaev@yandex.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка на консультацию от {name}'
    msg['From'] = smtp_user
    msg['To'] = to_email

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
            Новая заявка с сайта StarsBiz
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px; font-weight: bold; color: #555; width: 120px;">Имя:</td>
                <td style="padding: 10px;">{name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 10px;"><a href="mailto:{email}">{email}</a></td>
            </tr>
            <tr>
                <td style="padding: 10px; font-weight: bold; color: #555;">Телефон:</td>
                <td style="padding: 10px;">{phone if phone else '—'}</td>
            </tr>
            <tr style="background: #f9f9f9;">
                <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Комментарий:</td>
                <td style="padding: 10px;">{comment if comment else '—'}</td>
            </tr>
        </table>
    </div>
    """

    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
