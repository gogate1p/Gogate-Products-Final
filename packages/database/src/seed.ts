import { PrismaClient } from '@prisma/client';

declare const process: any;

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Gogate Products Multi-Tenant Platform...');

  // Clean existing tables
  await prisma.paymentTransaction.deleteMany();
  await prisma.trackingCheckpoint.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.tripSheet.deleteMany();
  await prisma.returnRequest.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.storeKYC.deleteMany();
  await prisma.store.deleteMany();
  await prisma.logisticsHub.deleteMany();
  await prisma.developerKeyVault.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Core Users with RBAC
  const superadmin = await prisma.user.create({
    data: {
      email: 'admin@gogateproducts.com',
      name: 'Shriram Gogate (Superadmin)',
      phone: '+919820011223',
      role: 'SUPERADMIN',
    },
  });

  const seller1 = await prisma.user.create({
    data: {
      email: 'orchard@gogateproducts.com',
      name: 'Gogate Orchards Farmer Direct',
      phone: '+919822334455',
      role: 'STORE_ADMIN',
    },
  });

  const seller2 = await prisma.user.create({
    data: {
      email: 'devgadguild@gmail.com',
      name: 'Devgad Cashew Farmer Producer Co.',
      phone: '+919833445566',
      role: 'STORE_ADMIN',
    },
  });

  const deliveryAgent = await prisma.user.create({
    data: {
      email: 'delivery.agent@gogatecourier.com',
      name: 'Ramesh Sawant (Express Delivery)',
      phone: '+919811223344',
      role: 'DELIVERY_EXECUTIVE',
    },
  });

  const truckDriver = await prisma.user.create({
    data: {
      email: 'driver.mumbai@gogatecourier.com',
      name: 'Suresh Patil (Linehaul Driver)',
      phone: '+919899887766',
      role: 'TRUCK_DRIVER',
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      name: 'Ananya Sharma',
      phone: '+919988776655',
      role: 'CUSTOMER',
    },
  });

  // 2. Create Stores
  const gogateStore = await prisma.store.create({
    data: {
      name: 'Gogate Organic Orchards (Ratnagiri Flagship)',
      slug: 'gogate-ratnagiri',
      domain: 'ratnagiri.gogateproducts.com',
      description: 'Generations of pure Konkan GI-certified Alphonso Mangoes, Cashews and Kokum.',
      ownerId: seller1.id,
      status: 'ACTIVE',
      kycStatus: 'APPROVED',
      fssaiNumber: '11521045000123',
      udyamNumber: 'UDYAM-MH-27-0012345',
      gstin: '27AAACG1234A1Z5',
      pickupEnabled: true,
      addressLine1: 'Gogate Wadi, At Post Pawas, Taluka Ratnagiri',
      city: 'Ratnagiri',
      state: 'Maharashtra',
      pincode: '415616',
      contactEmail: 'contact@gogateproducts.com',
      contactPhone: '+919822334455',
      rating: 4.95,
      kycDoc: {
        create: {
          fssaiNumber: '11521045000123',
          fssaiCertificateUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
          udyamNumber: 'UDYAM-MH-27-0012345',
          udyamCertificateUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
          gstin: '27AAACG1234A1Z5',
          panNumber: 'AAACG1234A',
          bankAccountNumber: '91802003884712',
          bankIfscCode: 'HDFC0001234',
          bankAccountHolder: 'Gogate Agro Farms Pvt Ltd',
          status: 'APPROVED',
          reviewedAt: new Date(),
          reviewedBy: superadmin.id,
          adminNotes: 'Direct orchard verification completed. All GI certifications validated.',
        },
      },
    },
  });

  const devgadStore = await prisma.store.create({
    data: {
      name: 'Devgad Cashew & Spice Guild',
      slug: 'devgad-spices',
      description: 'Premium organic cashew kernels and Konkan coastal spices.',
      ownerId: seller2.id,
      status: 'PENDING_KYC',
      kycStatus: 'SUBMITTED',
      fssaiNumber: '11522046000789',
      udyamNumber: 'UDYAM-MH-28-0056789',
      pickupEnabled: false,
      addressLine1: 'Naringre Road, Devgad',
      city: 'Sindhudurg',
      state: 'Maharashtra',
      pincode: '416613',
      contactEmail: 'guild@devgadcashew.in',
      contactPhone: '+919833445566',
      rating: 4.8,
      kycDoc: {
        create: {
          fssaiNumber: '11522046000789',
          udyamNumber: 'UDYAM-MH-28-0056789',
          panNumber: 'BBBCG5678B',
          bankAccountNumber: '50100492817264',
          bankIfscCode: 'ICIC0005678',
          bankAccountHolder: 'Devgad Agro Cooperative',
          status: 'SUBMITTED',
          adminNotes: 'Awaiting Superadmin physical certificate verification.',
        },
      },
    },
  });

  // 3. Create Organic Products
  const productsData = [
    {
      storeId: gogateStore.id,
      name: 'Original Ratnagiri Alphonso Mango (Hapus) - Grade A (1 Dozen)',
      slug: 'ratnagiri-alphonso-mango-grade-a',
      description: 'Naturally tree-ripened, GI Tagged Alphonso Mangoes handpicked from our 80-year-old family orchards in Pawas, Ratnagiri. Chemical-free, no carbide ripening. Rich aroma and saffron flesh.',
      category: 'MANGOES',
      imagesJson: JSON.stringify([
        'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800',
        'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=800',
      ]),
      mrp: 1800,
      price: 1450,
      sku: 'GGT-MNG-ALPH-1DZ',
      stock: 120,
      manufacturerName: 'Gogate Agro Farms Pvt Ltd',
      manufacturerAddress: 'Gogate Wadi, Pawas, Taluka Ratnagiri, Maharashtra 415616',
      fssaiNo: '11521045000123',
      udyamNo: 'UDYAM-MH-27-0012345',
      organicCertificationNumber: 'ORG/NPOP/MH-2024-9988',
      originRegion: 'Pawas, Ratnagiri (Konkan Coast)',
      harvestBatch: 'BATCH-2026-HAPUS-01',
      shelfLifeDays: 7,
      weightGrams: 3200,
      isPreOrder: false,
    },
    {
      storeId: gogateStore.id,
      name: 'Konkan Jumbo Roasted & Salted Cashews - W180 King Size (500g)',
      slug: 'konkan-jumbo-cashews-w180',
      description: 'Hand-shelled Grade W180 King Size organic cashew nuts from coastal Konkan. Lightly wood-fire roasted with natural rock salt. Extra crunchy, vacuum sealed for peak freshness.',
      category: 'CASHEWS',
      imagesJson: JSON.stringify([
        'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=800',
        'https://images.unsplash.com/photo-1543208541-00429edb185e?q=80&w=800',
      ]),
      mrp: 950,
      price: 799,
      sku: 'GGT-CSH-W180-500G',
      stock: 350,
      manufacturerName: 'Gogate Agro Farms Pvt Ltd',
      manufacturerAddress: 'Gogate Wadi, Pawas, Taluka Ratnagiri, Maharashtra 415616',
      fssaiNo: '11521045000123',
      udyamNo: 'UDYAM-MH-27-0012345',
      organicCertificationNumber: 'ORG/NPOP/MH-2024-9988',
      originRegion: 'Ratnagiri, Maharashtra',
      shelfLifeDays: 180,
      weightGrams: 500,
      isPreOrder: false,
    },
    {
      storeId: gogateStore.id,
      name: 'Pure Cold-Pressed Kokum Agal (Zero Sugar / Wild Foraged - 750ml)',
      slug: 'pure-kokum-agal-750ml',
      description: 'Pure coastal Garcinia indica (Kokum) extract infused with natural sea salt. Ideal for traditional Sol Kadhi, refreshing coolers, and digestive organic tonics.',
      category: 'KOKUM_PRODUCTS',
      imagesJson: JSON.stringify([
        'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800',
      ]),
      mrp: 320,
      price: 260,
      sku: 'GGT-KKM-AGAL-750ML',
      stock: 200,
      manufacturerName: 'Gogate Agro Farms Pvt Ltd',
      manufacturerAddress: 'Gogate Wadi, Pawas, Taluka Ratnagiri, Maharashtra 415616',
      fssaiNo: '11521045000123',
      udyamNo: 'UDYAM-MH-27-0012345',
      originRegion: 'Ratnagiri, Maharashtra',
      shelfLifeDays: 365,
      weightGrams: 850,
    },
    {
      storeId: gogateStore.id,
      name: 'Stone-Pounded Konkan Malvani Special Masala (500g)',
      slug: 'authentic-malvani-masala-500g',
      description: 'Handcrafted blend of 28 sun-dried organic spices including Dagad Phool, Star Anise, and Byadgi chillies. Traditionally pounded in stone mortars for intense aroma.',
      category: 'SPICES_AND_MASALAS',
      imagesJson: JSON.stringify([
        'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800',
      ]),
      mrp: 450,
      price: 380,
      sku: 'GGT-SPC-MALV-500G',
      stock: 180,
      manufacturerName: 'Gogate Agro Farms Pvt Ltd',
      manufacturerAddress: 'Gogate Wadi, Pawas, Taluka Ratnagiri, Maharashtra 415616',
      fssaiNo: '11521045000123',
      udyamNo: 'UDYAM-MH-27-0012345',
      originRegion: 'Konkan, Maharashtra',
      shelfLifeDays: 240,
      weightGrams: 520,
    },
  ];

  const createdProducts = [];
  for (const p of productsData) {
    const prod = await prisma.product.create({ data: p });
    createdProducts.push(prod);
  }

  // 4. Create Logistics Hubs
  const hubRatnagiri = await prisma.logisticsHub.create({
    data: {
      hubCode: 'HUB-RTN-01',
      name: 'Ratnagiri Central Agro Aggregation Hub',
      hubType: 'ORIGIN_SORTING',
      city: 'Ratnagiri',
      state: 'Maharashtra',
      pincode: '415612',
      contactNumber: '+912352220011',
    },
  });

  const hubMumbai = await prisma.logisticsHub.create({
    data: {
      hubCode: 'HUB-BOM-01',
      name: 'Mumbai Bhiwandi Linehaul Transit Sorting Hub',
      hubType: 'INTERMEDIATE_HUB',
      city: 'Mumbai / Thane',
      state: 'Maharashtra',
      pincode: '421302',
      contactNumber: '+912228776655',
    },
  });

  const hubPune = await prisma.logisticsHub.create({
    data: {
      hubCode: 'HUB-PUN-01',
      name: 'Pune Hadapsar Express Delivery Branch',
      hubType: 'DELIVERY_BRANCH',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411028',
      contactNumber: '+912026889900',
    },
  });

  // 5. Create Linehaul Trip Sheet for Truck Driver
  const tripSheet = await prisma.tripSheet.create({
    data: {
      tripCode: 'TRIP-RTN-BOM-20261027',
      driverId: truckDriver.id,
      vehicleNumber: 'MH-08-AG-9988',
      vehicleType: 'REFRIGERATED_CONTAINER_14FT',
      originHubCode: hubRatnagiri.hubCode,
      destinationHubCode: hubMumbai.hubCode,
      status: 'IN_TRANSIT',
      departureTime: new Date(Date.now() - 4 * 3600000),
      estimatedArrival: new Date(Date.now() + 3 * 3600000),
    },
  });

  // 6. Create Active Sample Order
  const order = await prisma.order.create({
    data: {
      orderNumber: 'GGT-ORD-100294',
      storeId: gogateStore.id,
      customerId: customer.id,
      customerName: 'Ananya Sharma',
      customerPhone: '+919988776655',
      customerEmail: 'customer@example.com',
      deliveryType: 'SHIPPING',
      shippingAddressJson: JSON.stringify({
        fullName: 'Ananya Sharma',
        phone: '+919988776655',
        addressLine1: 'Flat 402, Green Meadows, Koregaon Park',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001',
      }),
      subtotal: 2249,
      taxAmount: 112.45,
      shippingFee: 0,
      discountAmount: 100,
      totalAmount: 2261.45,
      paymentMethod: 'RAZORPAY',
      paymentStatus: 'PAID',
      orderStatus: 'SHIPPED',
      estimatedDeliveryDate: 'Tomorrow, by 6:00 PM',
      items: {
        create: [
          {
            productId: createdProducts[0].id,
            productName: createdProducts[0].name,
            productImage: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800',
            quantity: 1,
            unitPrice: 1450,
            totalPrice: 1450,
            fssaiNo: '11521045000123',
            manufacturerName: 'Gogate Agro Farms Pvt Ltd',
          },
          {
            productId: createdProducts[1].id,
            productName: createdProducts[1].name,
            productImage: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=800',
            quantity: 1,
            unitPrice: 799,
            totalPrice: 799,
            fssaiNo: '11521045000123',
            manufacturerName: 'Gogate Agro Farms Pvt Ltd',
          },
        ],
      },
    },
  });

  // 7. Create Shipment & Checkpoints
  const shipment = await prisma.shipment.create({
    data: {
      orderId: order.id,
      awbNumber: 'GGT-EXP-992014',
      courierPartner: 'IN_HOUSE',
      status: 'IN_TRANSIT',
      pickupPincode: '415616',
      deliveryPincode: '411001',
      currentHubId: hubMumbai.id,
      assignedTruckDriverId: truckDriver.id,
      assignedDeliveryExecutiveId: deliveryAgent.id,
      tripSheetId: tripSheet.id,
      estimatedDeliveryDate: 'Tomorrow, by 6:00 PM',
      shippingLabelUrl: 'https://gogateproducts.com/labels/GGT-EXP-992014.pdf',
      otpSecret: '8492',
      checkpoints: {
        create: [
          {
            status: 'CREATED',
            location: 'Pawas Orchard Warehouse, Ratnagiri',
            description: 'Order packed with organic eco-friendly cushioning and AWB assigned.',
            timestamp: new Date(Date.now() - 12 * 3600000),
          },
          {
            status: 'PICKED_UP',
            location: 'Ratnagiri Agro Hub (HUB-RTN-01)',
            description: 'Inward barcode scanned into temperature-monitored holding zone.',
            timestamp: new Date(Date.now() - 8 * 3600000),
          },
          {
            status: 'IN_TRANSIT',
            location: 'NH-66 Konkan Expressway Transit',
            description: 'Dispatched via Refrigerated Linehaul Truck MH-08-AG-9988 to Mumbai sorting facility.',
            timestamp: new Date(Date.now() - 3 * 3600000),
          },
        ],
      },
    },
  });

  // 8. Seed Developer Key Vault for Payment Gateways & Couriers
  const developerKeys = [
    {
      keyType: 'RAZORPAY',
      credentials: JSON.stringify({ keyId: 'rzp_live_gogate9988', keySecret: 'whsec_rzp_live_secret_key' }),
      environment: 'PRODUCTION',
      isEnabled: true,
    },
    {
      keyType: 'PAYTM_PG',
      credentials: JSON.stringify({ mid: 'GOGATE_PAYTM_MID_01', merchantKey: 'sec_paytm_key_live' }),
      environment: 'PRODUCTION',
      isEnabled: true,
    },
    {
      keyType: 'CASHFREE',
      credentials: JSON.stringify({ appId: 'CF_APP_GOGATE_PROD', secretKey: 'cf_sec_live_9988' }),
      environment: 'PRODUCTION',
      isEnabled: true,
    },
    {
      keyType: 'EAZEBUZZ',
      credentials: JSON.stringify({ key: 'EB_KEY_GOGATE', salt: 'EB_SALT_PROD_123' }),
      environment: 'PRODUCTION',
      isEnabled: true,
    },
    {
      keyType: 'PAYU',
      credentials: JSON.stringify({ key: 'PAYU_MERCHANT_KEY', salt: 'PAYU_SALT_SECRET' }),
      environment: 'PRODUCTION',
      isEnabled: true,
    },
    {
      keyType: 'SHIPROCKET',
      credentials: JSON.stringify({ email: 'logistics@gogateproducts.com', token: 'sr_api_bearer_token_xyz' }),
      environment: 'PRODUCTION',
      isEnabled: true,
    },
    {
      keyType: 'NIMBUSPOST',
      credentials: JSON.stringify({ apiKey: 'nimbus_live_api_key_8899' }),
      environment: 'PRODUCTION',
      isEnabled: true,
    },
    {
      keyType: 'TOOKAN',
      credentials: JSON.stringify({ apiKey: 'tookan_on_demand_fleet_key' }),
      environment: 'PRODUCTION',
      isEnabled: true,
    },
    {
      keyType: 'SHIPDAY',
      credentials: JSON.stringify({ apiKey: 'shipday_direct_dispatch_token' }),
      environment: 'PRODUCTION',
      isEnabled: true,
    },
    {
      keyType: 'PIDGE',
      credentials: JSON.stringify({ apiKey: 'pidge_radius_api_key_3344' }),
      environment: 'PRODUCTION',
      isEnabled: true,
    },
  ];

  for (const k of developerKeys) {
    await prisma.developerKeyVault.create({ data: k });
  }

  console.log('Seed completed successfully!');
  console.log(`- Created ${createdProducts.length} organic products`);
  console.log(`- Seeded stores, hubs, drivers, orders, and 10 Developer API Gateway/Courier keys.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
