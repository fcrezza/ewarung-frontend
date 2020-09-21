import React from 'react'
import useSWR from 'swr'
import {useForm, Controller} from 'react-hook-form'
import {Box} from '@chakra-ui/core'

import {Modal, ModalBody} from 'shared/Modal'
import {InputV2, NumberInput} from 'shared/Input'
import Combobox from 'shared/Combobox'
import Button from 'shared/Button'
import axios from 'libs/axios'
import styles from './addform.module.css'

function EditForm({isOpen, onClose, item}) {
  const {data: suppliers} = useSWR(
    isOpen ? 'http://localhost:5000/suppliers' : null,
    (url) => axios.get(url).then((res) => res.data)
  )
  const {handleSubmit, control, formState} = useForm()

  const onSubmit = async (formState) => {
    /*
      logic for update item
    */
    onClose()
  }

  return (
    <Modal title="Edit barang" isOpen={isOpen} onClose={onClose}>
      <ModalBody>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            defaultValue={item?.name}
            control={control}
            render={(props) => (
              <InputV2
                name="name"
                inputLabel="Nama barang"
                isRequired
                {...props}
              />
            )}
          />
          <Controller
            control={control}
            name="price"
            defaultValue={item?.price}
            render={(props) => (
              <NumberInput
                id="price"
                inputLabel="Harga barang"
                isRequired
                {...props}
              />
            )}
          />
          <Controller
            control={control}
            name="stock"
            defaultValue={item?.stock}
            render={(props) => (
              <NumberInput
                id={'stock'}
                inputLabel="Stok barang"
                isRequired
                {...props}
              />
            )}
          />
          <Controller
            name="idSupplier"
            defaultValue={item?.idSupplier}
            control={control}
            render={(props) => (
              <Combobox
                items={suppliers}
                inputLabel="Supplier barang"
                isRequired
                {...props}
              />
            )}
          />
          <Box marginBottom="4">
            <Button type="submit" block isDisabled={formState.isSubmitting}>
              Simpan
            </Button>
          </Box>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default EditForm
