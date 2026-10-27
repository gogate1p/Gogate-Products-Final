import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function App() {
  const [activeRole, setActiveRole] = useState<'DELIVERY_EXECUTIVE' | 'TRUCK_DRIVER'>('DELIVERY_EXECUTIVE');

  // Delivery Executive State
  const [otpInput, setOtpInput] = useState('');
  const [isDelivered, setIsDelivered] = useState(false);
  const [codCollected, setCodCollected] = useState(false);

  // Driver Linehaul State
  const [tripStatus, setTripStatus] = useState<'IN_TRANSIT' | 'ARRIVED_CHECKPOINT' | 'COMPLETED'>('IN_TRANSIT');
  const [tempReading] = useState('17.5°C');

  const verifyDelivery = () => {
    if (otpInput === '8492') {
      setIsDelivered(true);
      Alert.alert('Success', 'OTP Verified! Consignment marked as DELIVERED.');
    } else {
      Alert.alert('Invalid OTP', 'The OTP entered is incorrect. Please check with customer.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#064e3b" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Gogate Logistics Partner</Text>
          <View style={styles.onlineBadge}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>GPS Active</Text>
          </View>
        </View>
        <Text style={styles.headerSubtitle}>
          {activeRole === 'DELIVERY_EXECUTIVE'
            ? 'Delivery Executive: Ramesh Sawant'
            : 'Linehaul Driver: Suresh Patil'}
        </Text>

        {/* Role Selector Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeRole === 'DELIVERY_EXECUTIVE' && styles.tabActive]}
            onPress={() => setActiveRole('DELIVERY_EXECUTIVE')}
          >
            <Text style={[styles.tabText, activeRole === 'DELIVERY_EXECUTIVE' && styles.tabTextActive]}>
              🛵 Last-Mile Executive
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeRole === 'TRUCK_DRIVER' && styles.tabActive]}
            onPress={() => setActiveRole('TRUCK_DRIVER')}
          >
            <Text style={[styles.tabText, activeRole === 'TRUCK_DRIVER' && styles.tabTextActive]}>
              🚛 Truck Driver (Linehaul)
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* ============================================================== */}
        {/* ROLE 1: DELIVERY EXECUTIVE MODE */}
        {/* ============================================================== */}
        {activeRole === 'DELIVERY_EXECUTIVE' && (
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.orderNumber}>AWB: GGT-EXP-992014</Text>
                  <Text style={styles.subText}>Order #GGT-ORD-100294</Text>
                </View>
                <View style={[styles.badge, isDelivered ? styles.badgeSuccess : styles.badgePending]}>
                  <Text style={styles.badgeText}>{isDelivered ? 'DELIVERED' : 'OUT FOR DELIVERY'}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Customer Info */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Customer:</Text>
                <Text style={styles.infoValue}>Ananya Sharma</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Phone:</Text>
                <Text style={styles.infoValue}>+91 99887 76655</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Destination:</Text>
                <Text style={styles.infoValue}>Flat 402, Green Meadows, Koregaon Park, Pune</Text>
              </View>

              <View style={styles.divider} />

              {/* Package Details */}
              <View style={styles.packageCard}>
                <Text style={styles.packageTitle}>🥭 1x Alphonso Mangoes Grade A (1 Dozen)</Text>
                <Text style={styles.packageTitle}>🥜 1x Jumbo Cashews W180 (500g)</Text>
                <Text style={styles.perishableTag}>⚠️ Perishable Agro Produce • Handle with care</Text>
              </View>

              {/* Payment & COD */}
              <View style={styles.codBox}>
                <Text style={styles.codLabel}>Payment Mode:</Text>
                <Text style={styles.codValue}>Prepaid via Razorpay (₹2,261.45)</Text>
              </View>

              {/* Delivery Completion & OTP Verification */}
              {!isDelivered ? (
                <View style={styles.otpSection}>
                  <Text style={styles.otpPrompt}>Enter Customer 4-Digit OTP to complete drop:</Text>
                  <TextInput
                    style={styles.otpInput}
                    placeholder="Enter 4-Digit OTP (e.g. 8492)"
                    placeholderTextColor="#9ca3af"
                    keyboardType="number-pad"
                    maxLength={4}
                    value={otpInput}
                    onChangeText={setOtpInput}
                  />
                  <TouchableOpacity style={styles.verifyBtn} onPress={verifyDelivery}>
                    <Text style={styles.verifyBtnText}>Verify OTP & Complete Delivery</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.deliveredBox}>
                  <Text style={styles.deliveredText}>✅ Successfully Delivered & Proof Recorded</Text>
                  <Text style={styles.deliveredSub}>Location stamped & synced to Gogate Hub</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* ============================================================== */}
        {/* ROLE 2: TRUCK DRIVER (LINEHAUL / MIDDLE-MILE) MODE */}
        {/* ============================================================== */}
        {activeRole === 'TRUCK_DRIVER' && (
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.orderNumber}>Trip: TRIP-RTN-BOM-20261027</Text>
                  <Text style={styles.subText}>Truck: MH-08-AG-9988</Text>
                </View>
                <View style={styles.badgeInfo}>
                  <Text style={styles.badgeText}>{tripStatus}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.telematicsCard}>
                <Text style={styles.telematicsLabel}>❄️ Cold-Chain Container Temperature:</Text>
                <Text style={styles.telematicsValue}>{tempReading} (Optimal)</Text>
                <Text style={styles.telematicsSub}>Target range: 15°C - 19°C for Hapus Mangoes</Text>
              </View>

              <View style={styles.routeContainer}>
                <View style={styles.routeItem}>
                  <Text style={styles.routeDot}>🟢</Text>
                  <View>
                    <Text style={styles.routeTitle}>Origin: Ratnagiri Central Agro Hub</Text>
                    <Text style={styles.routeSub}>Departed: 06:30 AM • 4 Sealed Bags Loaded</Text>
                  </View>
                </View>
                <View style={styles.routeItem}>
                  <Text style={styles.routeDot}>📍</Text>
                  <View>
                    <Text style={styles.routeTitle}>Current: NH-66 Chiplun Bypass</Text>
                    <Text style={styles.routeSub}>Transit milestone cleared</Text>
                  </View>
                </View>
                <View style={styles.routeItem}>
                  <Text style={styles.routeDot}>🏁</Text>
                  <View>
                    <Text style={styles.routeTitle}>Destination: Mumbai Bhiwandi Sorting Hub</Text>
                    <Text style={styles.routeSub}>ETA: 02:30 PM (On Time)</Text>
                  </View>
                </View>
              </View>

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => {
                  setTripStatus('ARRIVED_CHECKPOINT');
                  Alert.alert('Checkpoint Check-in', 'QR Code scanned at Chiplun Highway Hub.');
                }}
              >
                <Text style={styles.actionBtnText}>📷 Scan Checkpoint Arrival QR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, styles.actionBtnOutline]}
                onPress={() => Alert.alert('Report Delay', 'Logged traffic/rain delay to Logistics Dispatcher.')}
              >
                <Text style={styles.actionBtnTextOutline}>⚠️ Report Highway Delay / Breakdown</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    backgroundColor: '#064e3b',
    padding: 16,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#a7f3d0',
    fontSize: 12,
    marginTop: 4,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ade80',
    marginRight: 6,
  },
  onlineText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#022c22',
    borderRadius: 10,
    padding: 3,
    marginTop: 14,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#10b981',
  },
  tabText: {
    color: '#9ca3af',
    fontSize: 11,
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  content: {
    padding: 16,
  },
  cardContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgePending: {
    backgroundColor: '#dbeafe',
  },
  badgeSuccess: {
    backgroundColor: '#dcfce7',
  },
  badgeInfo: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  infoLabel: {
    width: 90,
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  infoValue: {
    flex: 1,
    fontSize: 12,
    color: '#0f172a',
    fontWeight: '500',
  },
  packageCard: {
    backgroundColor: '#fef3c7',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  packageTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#78350f',
  },
  perishableTag: {
    fontSize: 10,
    color: '#92400e',
    marginTop: 4,
  },
  codBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 14,
  },
  codLabel: {
    fontSize: 12,
    color: '#475569',
  },
  codValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#047857',
  },
  otpSection: {
    marginTop: 6,
  },
  otpPrompt: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 4,
    backgroundColor: '#f8fafc',
    color: '#0f172a',
  },
  verifyBtn: {
    backgroundColor: '#064e3b',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  verifyBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  deliveredBox: {
    backgroundColor: '#ecfdf5',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  deliveredText: {
    color: '#065f46',
    fontWeight: 'bold',
    fontSize: 13,
  },
  deliveredSub: {
    color: '#047857',
    fontSize: 11,
    marginTop: 2,
  },
  telematicsCard: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  telematicsLabel: {
    fontSize: 11,
    color: '#166534',
    fontWeight: 'bold',
  },
  telematicsValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#14532d',
    marginTop: 2,
  },
  telematicsSub: {
    fontSize: 10,
    color: '#15803d',
    marginTop: 2,
  },
  routeContainer: {
    gap: 12,
    marginVertical: 8,
  },
  routeItem: {
    flexDirection: 'row',
    gap: 8,
  },
  routeDot: {
    fontSize: 14,
  },
  routeTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  routeSub: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 1,
  },
  actionBtn: {
    backgroundColor: '#0f172a',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  actionBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionBtnOutline: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionBtnTextOutline: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
  },
});
