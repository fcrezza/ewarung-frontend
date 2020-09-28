import React from 'react'
import {Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    fontSize: 11,
    fontFamily: 'Helvetica'
  },
  header: {
    borderBottom: '1 dashed #666'
  },
  titleContainer: {
    padding: 20,
    borderBottom: '1 dashed #666'
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 700
  },
  infoContainer: {
    padding: 15
  },
  infoItem: {
    flexDirection: 'row',
    padding: 5
  },
  infoLabel: {
    width: 80
  },
  infoValue: {},
  body: {
    padding: 10
  },
  tableHeader: {},
  tableRow: {
    flexDirection: 'row'
  },
  headerData: {
    padding: 10,
    width: '25%',
    fontWeight: 700
  },
  tableBody: {
    padding: '20 0',
    borderBottom: '1 dashed #666'
  },
  bodyData: {
    padding: 10,
    width: '25%'
  },
  tableFooter: {
    padding: '20 0',
    borderBottom: '1 dashed #666'
  },
  footer: {
    padding: 20
  },
  footerText: {
    textAlign: 'center'
  }
})

function PrintTransaction(props) {
  const {owner, store, invoice, items, cash, totalPrice, cashback} = props
  return (
    <Document>
      <Page>
        <InvoiceHeader owner={owner} store={store} invoice={invoice} />
        <InvoiceBody
          items={items}
          cash={cash}
          totalPrice={totalPrice}
          cashback={cashback}
        />
        <InvoiceFooter />
      </Page>
    </Document>
  )
}

function InvoiceFooter() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        --Terima kasih telah berbelanja diwarung kami--
      </Text>
    </View>
  )
}

function InvoiceBody({items, cash, totalPrice, cashback}) {
  return (
    <View style={styles.body}>
      <View style={styles.tableHeader}>
        <View style={styles.tableRow}>
          <Text style={styles.headerData}>Name</Text>
          <Text style={styles.headerData}>Jumlah</Text>
          <Text style={styles.headerData}>Harga</Text>
          <Text style={styles.headerData}>Total</Text>
        </View>
      </View>
      <View style={styles.tableBody}>
        {items.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.bodyData}>{item.name}</Text>
            <Text style={styles.bodyData}>{item.quantity}</Text>
            <Text style={styles.bodyData}>{item.price}</Text>
            <Text style={styles.bodyData}>{item.totalPrice}</Text>
          </View>
        ))}
      </View>
      <View style={styles.tableFooter}>
        <View style={styles.tableRow}>
          <Text style={styles.bodyData}>Total</Text>
          <Text style={styles.bodyData}>{items.length}</Text>
          <Text style={styles.bodyData}></Text>
          <Text style={styles.bodyData}>{totalPrice}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.bodyData}>Bayar</Text>
          <Text style={styles.bodyData}></Text>
          <Text style={styles.bodyData}></Text>
          <Text style={styles.bodyData}>{cash}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.bodyData}>Kembali</Text>
          <Text style={styles.bodyData}></Text>
          <Text style={styles.bodyData}></Text>
          <Text style={styles.bodyData}>{cashback}</Text>
        </View>
      </View>
    </View>
  )
}

function InvoiceHeader({store, owner, invoice}) {
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{store}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Tanggal:</Text>
          <Text style={styles.infoValue}>
            {new Date().toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Invoice:</Text>
          <Text style={styles.infoValue}>{invoice}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Pemilik:</Text>
          <Text style={styles.infoValue}>{owner}</Text>
        </View>
      </View>
    </View>
  )
}

export default React.memo(PrintTransaction)
