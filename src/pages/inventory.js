import React from 'react'
import {Flex} from '@chakra-ui/core'

import Head from 'components/Head'
import Dashboard from 'components/Dashboard'
import Menu from 'components/Menu'
import Pagination from 'components/Pagination'
import Search from 'components/Search'
import Data from 'components/Data'
import Checkbox from 'components/Checkbox'
import {
	Table,
	TableBody,
	TableHeader,
	TableData,
	TableHead,
	TableRow,
} from 'components/Table'

function Inventory() {
	return (
		<Dashboard title="Barang">
			<Head title="Barang" />
			<Menu.Container>
				<Menu.Link to="/dashboard/inventory/add">Tambah barang</Menu.Link>
				<Menu.Link to="/dashboard/inventory">Data Barang</Menu.Link>
			</Menu.Container>
			<Data.Container>
				<Flex
					justifyContent="space-between"
					alignItems="center"
					marginBottom="6"
				>
					<Search placeholder="Cari barang ..." />
					<Data.ButtonGroup>
						<Data.Button color="green.400">Edit</Data.Button>
						<Data.Button color="red.400">Hapus</Data.Button>
					</Data.ButtonGroup>
				</Flex>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>
								<Checkbox />
							</TableHead>
							<TableHead>Nama</TableHead>
							<TableHead>Harga</TableHead>
							<TableHead>Stok</TableHead>
							<TableHead>Supplier</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableData>
								<Checkbox />
							</TableData>
							<TableData>Shampo</TableData>
							<TableData>Rp. 3000</TableData>
							<TableData>20</TableData>
							<TableData>Usman</TableData>
						</TableRow>
						<TableRow>
							<TableData>
								<Checkbox />
							</TableData>
							<TableData>Sabun</TableData>
							<TableData>Rp. 2000</TableData>
							<TableData>5</TableData>
							<TableData>Panjol</TableData>
						</TableRow>
						<TableRow>
							<TableData>
								<Checkbox />
							</TableData>
							<TableData>Sikat gigi</TableData>
							<TableData>Rp. 2000</TableData>
							<TableData>5</TableData>
							<TableData>Panjol</TableData>
						</TableRow>
						<TableRow>
							<TableData>
								<Checkbox />
							</TableData>
							<TableData>Sabun</TableData>
							<TableData>Rp. 2000</TableData>
							<TableData>5</TableData>
							<TableData>Panjol</TableData>
						</TableRow>
						<TableRow>
							<TableData>
								<Checkbox />
							</TableData>
							<TableData>Sikat gigi</TableData>
							<TableData>Rp. 2000</TableData>
							<TableData>5</TableData>
							<TableData>Panjol</TableData>
						</TableRow>
						<TableRow>
							<TableData>
								<Checkbox />
							</TableData>
							<TableData>Sabun</TableData>
							<TableData>Rp. 2000</TableData>
							<TableData>5</TableData>
							<TableData>Panjol</TableData>
						</TableRow>
						<TableRow>
							<TableData>
								<Checkbox />
							</TableData>
							<TableData>Sikat gigi</TableData>
							<TableData>Rp. 2000</TableData>
							<TableData>5</TableData>
							<TableData>Panjol</TableData>
						</TableRow>
						<TableRow>
							<TableData>
								<Checkbox />
							</TableData>
							<TableData>Sabun</TableData>
							<TableData>Rp. 2000</TableData>
							<TableData>5</TableData>
							<TableData>Panjol</TableData>
						</TableRow>
						<TableRow>
							<TableData>
								<Checkbox />
							</TableData>
							<TableData>Sabun</TableData>
							<TableData>Rp. 2000</TableData>
							<TableData>5</TableData>
							<TableData>Panjol</TableData>
						</TableRow>
						<TableRow>
							<TableData>
								<Checkbox />
							</TableData>
							<TableData>Sabun</TableData>
							<TableData>Rp. 2000</TableData>
							<TableData>5</TableData>
							<TableData>Panjol</TableData>
						</TableRow>
					</TableBody>
				</Table>
				<Pagination.Container>
					<Pagination.Text>Menampilkan 1-10 dari 60</Pagination.Text>
					<Pagination.Button>←</Pagination.Button>
					<Pagination.Button>→</Pagination.Button>
				</Pagination.Container>
			</Data.Container>
		</Dashboard>
	)
}

export default Inventory
