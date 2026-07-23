export const openWhatsApp = async (phone: string, text: string) => {
  const number = phone.replace(/[^0-9]/g, '');
  const webUrl = `https://wa.me/${number}?text=${text}`;
  
  try {
    window.open(webUrl, '_system');
  } catch (e) {
    window.location.href = webUrl;
  }
};
