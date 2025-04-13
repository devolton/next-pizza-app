'use client'

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PaymentResult() {
    const { query } = useRouter();
    const { order_id } = query;
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        if (order_id) {
            fetch(`/api/payment-status?order_id=${order_id}`)
                .then((res) => res.json())
                .then((data) => setStatus(data.status === 'success' ? 'success' : 'error'))
                .catch(() => setStatus('error'));
        }
    }, [order_id]);

    return (
        <div style={{ padding: '3rem', textAlign: 'center' }}>
            {status === 'loading' && <p>⏳ Проверка оплаты...</p>}
            {status === 'success' && <h2>✅ Оплата прошла успешно!</h2>}
            {status === 'error' && <h2>❌ Оплата не прошла или отменена</h2>}
        </div>
    );
}
