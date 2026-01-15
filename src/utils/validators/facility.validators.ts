
export const required = (label: string) => ({
  required: `${label} is required`,
});


// Format Validators

export const email = {
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Invalid email address',
  },
};

export const mobile = {
  pattern: {
    value: /^[6-9]\d{9}$/,
    message: 'Invalid mobile number',
  },
};

export const pincode = {
  pattern: {
    value: /^\d{6}$/,
    message: 'Pincode must be 6 digits',
  },
};

// Number Range Validators
export const latitude = {
  valueAsNumber: true,
  validate: (v?: number) =>
    v === undefined ||
    (v >= -90 && v <= 90) ||
    'Latitude must be between -90 and 90',
};

export const longitude = {
  valueAsNumber: true,
  validate: (v?: number) =>
    v === undefined ||
    (v >= -180 && v <= 180) ||
    'Longitude must be between -180 and 180',
};

//Date Validators
export const requiredDate = (label: string) => ({
  required: `${label} is required`,
});

export const closureAfterOpening = (openingDate?: string) => ({
  validate: (closureDate?: string) =>
    !closureDate ||
    !openingDate ||
    closureDate >= openingDate ||
    'Closure date cannot be before opening date',
});

//Area/Number Validators
export const positiveNumberRequired = (label: string) => ({
  required: `${label} is required`,
  valueAsNumber: true,
  validate: (v?: number) =>
    typeof v === 'number' && v > 0
      ? true
      : `${label} must be greater than 0`,
});

export const carpetAreaValidator = (builtUpArea?: number) => ({
  required: 'Carpet Area is required',
  valueAsNumber: true,
  validate: (v?: number) => {
    if (typeof v !== 'number' || v <= 0) {
      return 'Carpet Area must be greater than 0';
    }

    if (typeof builtUpArea === 'number' && v > builtUpArea) {
      return 'Carpet Area cannot be greater than Built Up Area';
    }

    return true;
  },
});


