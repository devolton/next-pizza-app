import crypto from "crypto";

export function createPayment(amount: number, orderId: string, description: string) {
    const publicKey = process.env.LIQPAY_API_PUBLIC_KEY!;
    const privateKey = process.env.LIQPAY_API_PRIVATE_KEY!;

    const data = {
        public_key: publicKey,
        version: 3,
        action: 'pay',
        amount,
        currency: 'UAH',
        description,
        order_id: orderId,
        result_url: 'http://localhost:3000',
        server_url: 'http://localhost:3000/api/checkout/callback',
    };

    const jsonData = JSON.stringify(data);
    const base64Data = Buffer.from(jsonData).toString('base64');
    const signature = crypto
        .createHash('sha1')
        .update(privateKey + base64Data + privateKey)
        .digest('base64');

    const checkoutUrl = `https://www.liqpay.ua/api/3/checkout?data=${encodeURIComponent(base64Data)}&signature=${encodeURIComponent(signature)}`;

    return checkoutUrl;
}
