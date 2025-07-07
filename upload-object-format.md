------ properties ---------

{
title: 'Modern 2 Bedroom Apartment for Rent in Ikeja GRA',
description:
'Well-furnished apartment in prestigious Ikeja Government Reserved Area',
price: 1200000,
currency: 'NGN',
location: 'Ikeja GRA',
state: 'Lagos',
bedrooms: 2,
bathrooms: 2,
area: 120,
propertyType: 'rent',
category: 'apartment',
images: [
'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80',
'https://res.cloudinary.com/dzd51q99i/image/upload/v1749914330/oci/properties/property1/Property1-image2_kwo7pm.jpg',
'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
],
video: 'https://www.youtube.com/watch?v=R_9-JElwV2A&t',
features: [
'Fully Furnished',
'Central Air Conditioning',
'Backup Generator',
'24/7 Security',
'Parking',
'Garden View Balcony',
'Swimming Pool Access',
'Fitness Center',
],
agent: {
name: 'Lagos Homes Realty',
email: 'info@lagoshomes.com',
phone: '+234 803 456 7890',
},
createdAt: '2024-02-05',
slug: 'modern-2-bedroom-apartment-ikeja-gra',
},

------ properties ---------

------ blogs ------------

{
\_id: `blog-${uuidv4()}`,
\_type: 'blog',
title: 'Home Staging Tips That Actually Work: Maximize Your Sale Price',
slug: {
current: 'home-staging-tips-maximize-sale-price',
\_type: 'slug',
},
excerpt:
'Learn proven home staging techniques that help sell homes faster and for more money. Discover budget-friendly tips and professional strategies.',
mainImage: {
\_type: 'image',
asset: {
\_type: 'reference',
\_ref: 'image-unsplash-staged-living-room-1',
},
alt: 'Beautifully staged living room with modern furniture and decor',
},
category: 'tips-guides',
content: [
createHeadingBlock('The Psychology of Home Staging'),
...createContentBlocks([
"Home staging is about creating an emotional connection between potential buyers and your property. When buyers can envision themselves living in the space, they're more likely to make an offer and pay a premium price.",
"Neutral colors and minimal personal items help buyers focus on the home's features rather than the current owner's taste. This doesn't mean your home should be bland – it should be inviting and stylish while appealing to the broadest possible audience.",
"Proper staging can help buyers overlook minor flaws and focus on the home's potential. It can also make spaces appear larger and more functional than they actually are.",
]),
createHeadingBlock('Room-by-Room Staging Strategies'),
...createContentBlocks([
'Start with the entrance and main living areas, as these create the first impression. Ensure these spaces are clutter-free, well-lit, and arranged to show good traffic flow.',
'In bedrooms, create a serene, hotel-like atmosphere with neutral bedding and minimal furniture. Remove personal photos and excess clothing from closets to make spaces appear larger.',
'Kitchens and bathrooms should be spotless and clutter-free. Consider small updates like new hardware, fresh caulk, or updated lighting fixtures to make these important spaces shine.',
"Don't forget about outdoor spaces – first impressions start at the curb. Ensure landscaping is neat, walkways are clear, and the entrance is welcoming.",
]),
],
author: {
\_type: 'reference',
\_ref: 'author-sample',
},
publishedAt: '2024-11-20T08:30:00Z',
featured: false,
tags: ['home-staging', 'home-selling', 'interior-design', 'property-value'],
seo: {
metaTitle: 'Home Staging Tips 2025 | Maximize Your Sale Price',
metaDescription:
'Proven home staging techniques that help sell homes faster and for more money. Budget-friendly tips and professional strategies.',
},
},

---

      // Define Unsplash image URLs (these are working URLs - replace with your preferred images)
    const imageUrls = {
      'image-unsplash-house-exterior-1':
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    };
