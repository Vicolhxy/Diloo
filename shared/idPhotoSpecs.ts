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
    allowCustomDPI: true
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

// Default export for easier importing
export default idPhotoSpecs;
