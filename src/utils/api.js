/**
 * API service for communicating with AutoFlow AI backend
 */

export async function submitLead(leadData) {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Talep kaydedilirken bir hata oluştu.',
        details: data.details || null,
        status: response.status
      };
    }

    return {
      success: true,
      data: data.data,
      message: data.message
    };
  } catch (err) {
    console.error('API submit lead network error:', err);
    return {
      success: false,
      error: 'Sunucuya bağlanılamadı. Lütfen internet bağlantınızı ve sunucu durumunu kontrol edin.',
      details: null
    };
  }
}

export async function fetchLeads() {
  try {
    const response = await fetch('/api/leads');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('API fetch leads error:', err);
    return { success: false, data: [] };
  }
}

export async function clearLeads() {
  try {
    const response = await fetch('/api/leads/clear', { method: 'DELETE' });
    const data = await response.json();
    return data;
  } catch (err) {
    return { success: false, error: 'Sunucu bağlantı hatası' };
  }
}
