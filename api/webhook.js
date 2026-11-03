module.exports = async (req, res) => {
  // Aceita apenas POST (ou GET para teste de status)
  if (req.method === 'POST') {
    try {
      const payload = req.body;
      const eventType = payload && payload.type;
      console.log(`[BravoPay Webhook] Evento recebido: ${eventType || 'desconhecido'}`);

      // Responde 200 OK imediatamente (requisito da BravoPay)
      return res.status(200).json({
        received: true,
        event: eventType,
        timestamp: Date.now()
      });
    } catch (err) {
      console.error('[BravoPay Webhook] Erro ao processar:', err);
      return res.status(200).json({ received: true, error: err.message });
    }
  }

  // Resposta para teste de navegação direta
  return res.status(200).json({
    status: 'online',
    service: 'FastFish BravoPay Webhook',
    message: 'Pronto para receber notificações POST da BravoPay'
  });
};

