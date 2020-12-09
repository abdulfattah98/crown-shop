import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    DataTableCell,
} from '@david.kucsai/react-pdf-table';

const Invoice = ({ order }) => (
    <Document>
        <Page style={styles.body}>
            <Text style={styles.header} fixed>
                ~ {new Date().toLocaleString()} ~
            </Text>
            <Text style={styles.title}>Order Summary</Text>

            <Table>
                <TableHeader>
                    <TableCell colSpan={2} style={styles.tableD}>
                        Title
                    </TableCell>
                    <TableCell style={styles.tableD}>Price</TableCell>
                    <TableCell style={styles.tableD}>Quantity</TableCell>
                    <TableCell style={styles.tableD}>Brand</TableCell>
                    <TableCell style={styles.tableD}>Color</TableCell>
                </TableHeader>
            </Table>

            <Table data={order.products}>
                <TableBody>
                    <DataTableCell
                        style={styles.tableD}
                        getContent={(x) => x.product.title}
                    />
                    <DataTableCell
                        style={styles.tableD}
                        getContent={(x) => `$${x.product.price}`}
                    />
                    <DataTableCell
                        style={styles.tableD}
                        getContent={(x) => x.count}
                    />
                    <DataTableCell
                        style={styles.tableD}
                        getContent={(x) => x.product.brand}
                    />
                    <DataTableCell
                        style={styles.tableD}
                        getContent={(x) => x.color}
                    />
                </TableBody>
            </Table>

            <Text style={styles.text}>
                {'\n'}
                <Text style={styles.margin}>
                    Date:{' '}
                    {new Date(
                        order.paymentIntent.created * 1000
                    ).toLocaleString()}
                    {'           '}Name: {order.orderdBy.name}
                </Text>

                {'\n'}
                {'\n'}

                <Text style={styles.margin}>
                    phone: {order.orderdBy.address[0].phone}
                    {'                            '} Order Status:{' '}
                    {order.orderStatus}
                </Text>

                {'\n'}
                {'\n'}

                <Text style={styles.bold}>
                    Total Paid: {order.paymentIntent.amount}
                </Text>
            </Text>

            <Text style={styles.footer}>
                {' '}
                ~ Thank you for shopping with us ~{' '}
            </Text>
        </Page>
    </Document>
);

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 40,
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
    },
    marginFirst: {
        marginTop: 20,
        marginBottom: 20,
    },
    margin: {
        marginBottom: 20,
    },

    tableD: {
        textAlign: 'center',
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    footer: {
        padding: '100px',
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    bold: {
        fontWeight: 600,
    },
});

export default Invoice;
