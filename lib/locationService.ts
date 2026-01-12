
export const getAutoDetectedCountry = async () => {
  try {
    // We attempt to get the country from an IP API which is often more reliable than browser geolocation for just the country code
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      countryCode: data.country_calling_code || '+1',
      countryName: data.country_name || 'United States'
    };
  } catch (error) {
    console.warn('Geolocation trace failed, falling back to default', error);
    return { countryCode: '+1', countryName: 'United States' };
  }
};
