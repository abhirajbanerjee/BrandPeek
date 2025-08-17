export const formatBrandData = (brand) => {
  return {
    id: String(brand.id),
    name: String(brand.name),
    logo: String(brand.logo),
    tagline: String(brand.tagline),
    description: brand.description ? String(brand.description) : ''
  };
};

export const validateBrandData = (brand) => {
  return brand.id && brand.name && brand.logo && brand.tagline;
};

export const isNetworkError = (error) => {
  return error.name === 'TypeError' && error.message.includes('fetch');
};