// ID Photo Specifications Configuration
// Based on country and document type requirements

export interface DocumentSpec {
  size: string;
  dpi: number | string;
  backgroundColor: string;
  fileFormat: string;
}

export interface Country {
  name: string;
  documentTypes: {
    [key: string]: DocumentSpec;
  };
}

export interface PhotoSize {
  label: string;
  widthMm: number;
  heightMm: number;
}

export interface BackgroundColor {
  name: string;
  hex: string;
}

export interface IDPhotoConfig {
  countries: {
    [key: string]: Country;
  };
  common: {
    backgroundColorOptions: string[];
    fileFormatOptions: string[];
    unitOptions: string[];
    dpiOptions: number[];
    allowCustomSize: boolean;
    allowCustomDPI: boolean;
    commonPhotoSizes: PhotoSize[];
    backgroundColors: BackgroundColor[];
  };
}

export const idPhotoSpecs: IDPhotoConfig = {
  countries: {
    Canada: {
      name: "Canada",
      documentTypes: {
        Passport: {
          size: "50x70 mm",
          dpi: 300,
          backgroundColor: "White",
          fileFormat: "JPG"
        },
        DriverLicense: {
          size: "50x70 mm",
          dpi: 300,
          backgroundColor: "White",
          fileFormat: "JPG"
        },
        PRCard: {
          size: "35x45 mm",
          dpi: 300,
          backgroundColor: "White",
          fileFormat: "JPG"
        },
        Visa: {
          size: "35x45 mm",
          dpi: 300,
          backgroundColor: "Light gray",
          fileFormat: "JPG"
        },
        Other: {
          size: "",
          dpi: "",
          backgroundColor: "",
          fileFormat: ""
        }
      }
    },

    USA: {
      name: "USA",
      documentTypes: {
        Passport: {
          size: "2x2 inch",
          dpi: 300,
          backgroundColor: "White",
          fileFormat: "JPG"
        },
        Visa: {
          size: "2x2 inch",
          dpi: 300,
          backgroundColor: "White",
          fileFormat: "JPG"
        },
        DriverLicense: {
          size: "2x2 inch",
          dpi: 300,
          backgroundColor: "White",
          fileFormat: "JPG"
        },
        Other: {
          size: "",
          dpi: "",
          backgroundColor: "",
          fileFormat: ""
        }
      }
    },

    China: {
      name: "China",
      documentTypes: {
        IDCard: {
          size: "33x48 mm",
          dpi: 300,
          backgroundColor: "Blue",
          fileFormat: "JPG"
        },
        Passport: {
          size: "33x48 mm",
          dpi: 300,
          backgroundColor: "White",
          fileFormat: "JPG"
        },
        Visa: {
          size: "33x48 mm",
          dpi: 300,
          backgroundColor: "Light gray",
          fileFormat: "JPG"
        },
        Other: {
          size: "",
          dpi: "",
          backgroundColor: "",
          fileFormat: ""
        }
      }
    },

    EU: {
      name: "EU",
      documentTypes: {
        Passport: {
          size: "35x45 mm",
          dpi: 600,
          backgroundColor: "Light gray",
          fileFormat: "JPG"
        },
        Visa: {
          size: "35x45 mm",
          dpi: 600,
          backgroundColor: "White",
          fileFormat: "JPG"
        },
        IDCard: {
          size: "35x45 mm",
          dpi: 600,
          backgroundColor: "White",
          fileFormat: "JPG"
        },
        Other: {
          size: "",
          dpi: "",
          backgroundColor: "",
          fileFormat: ""
        }
      }
    },

    Japan: {
      name: "Japan",
      documentTypes: {
        Passport: {
          size: "35x45 mm",
          dpi: 300,
          backgroundColor: "White",
          fileFormat: "JPG"
        },
        DriverLicense: {
          size: "30x24 mm",
          dpi: 300,
          backgroundColor: "White",
          fileFormat: "JPG"
        },
        Visa: {
          size: "35x45 mm",
          dpi: 300,
          backgroundColor: "Light gray",
          fileFormat: "JPG"
        },
        Other: {
          size: "",
          dpi: "",
          backgroundColor: "",
          fileFormat: ""
        }
      }
    },

    Other: {
      name: "Other",
      documentTypes: {
        Custom: {
          size: "",
          dpi: "",
          backgroundColor: "",
          fileFormat: ""
        }
      }
    }
  },

  common: {
    backgroundColorOptions: ["White", "Blue", "Light gray", "Red", "Custom"],
    fileFormatOptions: ["JPG", "PNG", "PDF"],
    unitOptions: ["mm", "inch"],
    dpiOptions: [300, 600],
    allowCustomSize: true,
    allowCustomDPI: true,
    commonPhotoSizes: [
      { label: "35x45 mm / 1.38x1.77 in", widthMm: 35, heightMm: 45 },
      { label: "50x70 mm / 1.97x2.76 in", widthMm: 50, heightMm: 70 },
      { label: "33x48 mm / 1.30x1.89 in", widthMm: 33, heightMm: 48 },
      { label: "51x51 mm / 2.01x2.01 in", widthMm: 51, heightMm: 51 },
      { label: "2x2 in / 50.8x50.8 mm", widthMm: 50.8, heightMm: 50.8 },
      { label: "30x24 mm / 1.18x0.94 in", widthMm: 30, heightMm: 24 },
    ],
    backgroundColors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Red", hex: "#FF0000" },
      { name: "Blue", hex: "#0000FF" },
    ]
  }
};

// Helper function to get document types for a country
export function getDocumentTypes(countryKey: string): string[] {
  const country = idPhotoSpecs.countries[countryKey];
  return country ? Object.keys(country.documentTypes) : [];
}

// Helper function to get spec for a country and document type
export function getDocumentSpec(countryKey: string, documentType: string): DocumentSpec | null {
  const country = idPhotoSpecs.countries[countryKey];
  if (!country) return null;
  return country.documentTypes[documentType] || null;
}

// Helper to format document type display name
export function formatDocumentType(type: string): string {
  const displayNames: { [key: string]: string } = {
    'Passport': 'Passport',
    'DriverLicense': 'Driver License',
    'PRCard': 'PR Card',
    'Visa': 'Visa',
    'IDCard': 'ID Card',
    'Custom': 'Custom',
    'Other': 'Other'
  };
  return displayNames[type] || type;
}

// Helper to convert PhotoSize to size string for calculation
export function photoSizeToString(photoSize: PhotoSize): string {
  return `${photoSize.widthMm}x${photoSize.heightMm} mm`;
}

// Helper to find PhotoSize by label
export function findPhotoSizeByLabel(label: string): PhotoSize | undefined {
  return idPhotoSpecs.common.commonPhotoSizes.find(size => size.label === label);
}

// Helper to parse size string and convert to mm
function parseSizeToMm(sizeString: string): { widthMm: number; heightMm: number } | null {
  const sizePattern = /(\d+\.?\d*)\s*x\s*(\d+\.?\d*)\s*(mm|inch|in)/i;
  const match = sizeString.match(sizePattern);
  
  if (!match) return null;
  
  const width = parseFloat(match[1]);
  const height = parseFloat(match[2]);
  const unit = match[3].toLowerCase();
  
  if (isNaN(width) || isNaN(height)) return null;
  
  if (unit === 'mm') {
    return { widthMm: width, heightMm: height };
  } else if (unit === 'inch' || unit === 'in') {
    return { widthMm: width * 25.4, heightMm: height * 25.4 };
  }
  
  return null;
}

// Helper to find PhotoSize by spec size string (handles both mm and inch)
export function findPhotoSizeBySpec(specSize: string): PhotoSize | undefined {
  const parsedSpec = parseSizeToMm(specSize);
  if (!parsedSpec) return undefined;
  
  // Find matching size with tolerance of 0.1mm
  return idPhotoSpecs.common.commonPhotoSizes.find(size => {
    const widthDiff = Math.abs(size.widthMm - parsedSpec.widthMm);
    const heightDiff = Math.abs(size.heightMm - parsedSpec.heightMm);
    return widthDiff < 0.1 && heightDiff < 0.1;
  });
}

// Default export for easier importing
export default idPhotoSpecs;
