export const property = {
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Property Title',
      type: 'string',
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'propertyReference',
      title: 'Property Reference Number',
      type: 'string',
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
          { title: 'Future', value: 'future' },
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
        ],
      },
      validation: (rule: any) => rule.required(),
    },

    {
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'Residential', value: 'residential' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Corporate', value: 'corporate' },
          { title: 'Duplex', value: 'duplex' },
          { title: 'Bungalow', value: 'bungalow' },
          { title: 'Apartment', value: 'apartment' },
          { title: 'Land', value: 'land' },
        ],
      },
      validation: (rule: any) => rule.required(),
    },

    {
      name: 'images',
      title: 'Property Images (Cloudinary)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'cloudinaryUrl',
              title: 'Cloudinary Image URL',
              type: 'url',
              validation: (rule: any) => rule.required(),
            },
            {
              name: 'caption',
              title: 'Image Caption (Admin reference only)',
              type: 'string',
            },
            {
              name: 'isFeatured',
              title: 'Featured Image (for property card)',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              validation: (rule: any) => rule.required().min(1),
            },
          ],
        },
      ],
      validation: (rule: any) => rule.max(6),
    },
    {
      name: 'propertyDetails',
      title: 'Property Details',
      type: 'object',
      fields: [
        {
          name: 'size',
          title: 'Size (sqm)',
          type: 'number',
        },
        {
          name: 'bedrooms',
          title: 'Bedrooms',
          type: 'number',
        },
        {
          name: 'bathrooms',
          title: 'Bathrooms',
          type: 'number',
        },
        {
          name: 'parkingSpaces',
          title: 'Parking Spaces',
          type: 'number',
        },
      ],
    },
    {
      name: 'description',
      title: 'Property Description',
      type: 'text',
      rows: 4,
    },

    {
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'state',
          title: 'State',
          type: 'string',
          options: {
            list: [
              'Abia',
              'Adamawa',
              'Akwa Ibom',
              'Anambra',
              'Bauchi',
              'Bayelsa',
              'Benue',
              'Borno',
              'Cross River',
              'Delta',
              'Ebonyi',
              'Edo',
              'Ekiti',
              'Enugu',
              'FCT',
              'Gombe',
              'Imo',
              'Jigawa',
              'Kaduna',
              'Kano',
              'Katsina',
              'Kebbi',
              'Kogi',
              'Kwara',
              'Lagos',
              'Nasarawa',
              'Niger',
              'Ogun',
              'Ondo',
              'Osun',
              'Oyo',
              'Plateau',
              'Rivers',
              'Sokoto',
              'Taraba',
              'Yobe',
              'Zamfara',
            ],
          },
          validation: (rule: any) => rule.required(),
        },
        {
          name: 'city',
          title: 'City/Area',
          type: 'string',
          validation: (rule: any) => rule.required(),
        },
        {
          name: 'address',
          title: 'Specific Address',
          type: 'text',
        },
      ],
    },
    {
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        {
          name: 'price',
          title: 'Price (₦)',
          type: 'number',
          validation: (rule: any) => rule.required().positive(),
        },
        {
          name: 'paymentPlans',
          title: 'Payment Plans Available',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'buyAndPayLater',
          title: 'Buy and Pay Later Option',
          type: 'boolean',
          initialValue: false,
        },
      ],
    },
    {
      name: 'videos',
      title: 'Property Videos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              validation: (rule: any) =>
                rule.uri({
                  scheme: ['http', 'https'],
                }),
            },
            {
              name: 'title',
              title: 'Video Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Video Description',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
};
