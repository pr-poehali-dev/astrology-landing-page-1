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
    birth = body.get('birth', '').strip()
    source = body.get('source', '').strip()

    if not name:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя обязательно'})
        }

    source_labels = {
        'landing-sdelka': '🗓 Лендинг /sdelka — Подбор даты для сделки',
        'landing-monthly': '📅 Лендинг /monthly — Прогноз на месяц',
        'landing-business': '💼 Лендинг /business — Подбор ниши',
        'landing-time': '⏱ Лендинг /time — Ректификация',
    }
    source_label = source_labels.get(source, '🌐 Главный сайт starsbiz.ru')

    smtp_user = 'vla-rastegaev@yandex.ru'
    smtp_password = os.environ['YANDEX_SMTP_PASSWORD']
    to_email = 'vla-rastegaev@yandex.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка от {name} — {source_label}'
    msg['From'] = smtp_user
    msg['To'] = to_email

    rows = f"""
            <tr>
                <td style="padding: 10px; font-weight: bold; color: #555; width: 160px;">Источник:</td>
                <td style="padding: 10px; color: #D4AF37; font-weight: bold;">{source_label}</td>
            </tr>
            <tr style="background: #f9f9f9;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Имя:</td>
                <td style="padding: 10px;">{name}</td>
            </tr>
            <tr>
                <td style="padding: 10px; font-weight: bold; color: #555;">Телефон / Telegram:</td>
                <td style="padding: 10px;">{phone if phone else '—'}</td>
            </tr>"""

    if email:
        rows += f"""
            <tr style="background: #f9f9f9;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 10px;"><a href="mailto:{email}">{email}</a></td>
            </tr>"""

    if birth:
        rows += f"""
            <tr>
                <td style="padding: 10px; font-weight: bold; color: #555;">Дата рождения:</td>
                <td style="padding: 10px;">{birth}</td>
            </tr>"""

    rows += f"""
            <tr style="background: #f9f9f9;">
                <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Комментарий:</td>
                <td style="padding: 10px;">{comment if comment else '—'}</td>
            </tr>"""

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
            Новая заявка с сайта StarsBiz
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
            {rows}
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