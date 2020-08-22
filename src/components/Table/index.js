import React from 'react'

import styles from './table.module.css'

function Table({children}) {
	return <table className={styles.table}>{children}</table>
}

function TableRow({children}) {
	return <tr className={styles.row}>{children}</tr>
}

function TableHeader({children}) {
	return <thead className={styles.heading}>{children}</thead>
}

function TableHead({children}) {
	return <th className={styles.head}>{children}</th>
}

function TableBody({children}) {
	return <tbody className={styles.body}>{children}</tbody>
}

function TableData({children}) {
	return <td>{children}</td>
}

export {Table, TableHeader, TableBody, TableRow, TableHead, TableData}
