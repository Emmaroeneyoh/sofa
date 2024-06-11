const csv = require('csv-parser');
const fs = require('fs');

const extractProductData = async (filePath) => {
  return new Promise((resolve, reject) => {
    try {
        const products = [];
        
      fs.createReadStream(filePath)
        .pipe(csv())
          .on('data', (row) => {
            console.log('row' , row['Product Category'],)
          const product = {
            handle: row['Handle'],
            title: row['Title'],
            bodyHtml: row['Body (HTML)'],
            vendor: row['Vendor'],
            productCategory: row['Product Category'],
            type: row['Type'],
            tags: row['Tags'],
            published: row['Published'] === 'TRUE',
            options: [
              { name: row['Option1 Name'], value: row['Option1 Value'] },
              { name: row['Option2 Name'], value: row['Option2 Value'] },
              { name: row['Option3 Name'], value: row['Option3 Value'] }
            ].filter(option => option.name && option.value),
            variants: [
              {
                sku: row['Variant SKU'],
                grams: row['Variant Grams'],
                inventoryTracker: row['Variant Inventory Tracker'],
                inventoryQty: row['Variant Inventory Qty'],
                inventoryPolicy: row['Variant Inventory Policy'],
                fulfillmentService: row['Variant Fulfillment Service'],
                price: row['Variant Price'],
                compareAtPrice: row['Variant Compare At Price'],
                requiresShipping: row['Variant Requires Shipping'] === 'TRUE',
                taxable: row['Variant Taxable'] === 'TRUE',
                barcode: row['Variant Barcode']
              }
            ],
            images: [
              { src: row['Image Src'], altText: row['Image Alt Text'] }
            ],
            giftCard: row['Gift Card'] === 'TRUE',
            seo: {
              title: row['SEO Title'],
              description: row['SEO Description']
            },
            googleShopping: {
              productCategory: row['Google Shopping / Google Product Category'],
              gender: row['Google Shopping / Gender'],
              ageGroup: row['Google Shopping / Age Group'],
              mpn: row['Google Shopping / MPN'],
              adWordsGrouping: row['Google Shopping / AdWords Grouping'],
              adWordsLabels: row['Google Shopping / AdWords Labels'],
              condition: row['Google Shopping / Condition'],
              customProduct: row['Google Shopping / Custom Product'],
              customLabel0: row['Google Shopping / Custom Label 0'],
              customLabel1: row['Google Shopping / Custom Label 1'],
              customLabel2: row['Google Shopping / Custom Label 2'],
              customLabel3: row['Google Shopping / Custom Label 3'],
              customLabel4: row['Google Shopping / Custom Label 4']
            },
            internationalPricing: {
              unitedKingdom: {
                included: row['Included / United Kingdom'] === 'TRUE',
                price: row['Price / United Kingdom'],
                compareAtPrice: row['Compare At Price / United Kingdom']
              },
              europeanUnion: {
                included: row['Included / European Union'] === 'TRUE',
                price: row['Price / European Union'],
                compareAtPrice: row['Compare At Price / European Union']
              },
              international: {
                included: row['Included / International'] === 'TRUE',
                price: row['Price / International'],
                compareAtPrice: row['Compare At Price / International']
              }
            },
            status: row['Status']
          };

          products.push(product);
        })
        .on('end', () => {
          console.log('CSV file successfully processed');
          resolve(products);
        })
        .on('error', (error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  extractProductData
};
