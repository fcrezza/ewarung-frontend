import React, {useState} from 'react'
import {useCombobox} from 'downshift'
import {FaCaretDown} from 'react-icons/fa'
import {FormControl, Box, Input, IconButton, PseudoBox} from '@chakra-ui/core'

import Label from 'shared/Label'
import styles from './combobox.module.css'

function DropdownCombobox({
  items = [],
  inputLabel,
  isRequired,
  value,
  onChange,
  ...props
}) {
  const [inputItems, setInputItems] = useState(items)
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    setInputValue,
    getItemProps
  } = useCombobox({
    items: inputItems,
    onIsOpenChange: ({isOpen, inputValue}) => {
      if (!isOpen) {
        const filterItem = items.find(
          (i) => i.name.toLowerCase() === inputValue.toLowerCase()
        )
        if (!filterItem) {
          setInputValue('')
          onChange(null)
        } else {
          onChange(filterItem.id)
        }
      }
    },
    selectedItem: items.find((i) => i.id === value) || null,
    onInputValueChange: ({inputValue}) => {
      const filteredItem = items.filter((item) =>
        item.name.toLowerCase().startsWith(inputValue.toLowerCase())
      )
      setInputItems(filteredItem)
    },
    onSelectedItemChange: ({selectedItem}) => onChange(selectedItem.id),
    itemToString: (item) => (item ? item.name : '')
  })

  React.useEffect(() => {
    setInputItems(items)
  }, [items])

  return (
    <Box position="relative">
      <FormControl isRequired={isRequired}>
        <Label {...getLabelProps()}>{inputLabel}</Label>
        <div className={styles.combobox} {...getComboboxProps()}>
          <Input {...getInputProps()} />
          <div className={styles.inputRightElement}>
            <IconButton
              icon={FaCaretDown}
              aria-label="toggle menu"
              {...getToggleButtonProps()}
            />
          </div>
        </div>
      </FormControl>
      <Box
        position="absolute"
        top="100%"
        width="100%"
        zIndex="1"
        boxShadow="lg"
        backgroundColor="gray.50"
        {...getMenuProps()}
      >
        {isOpen && !Boolean(items) ? (
          <Box padding="2">Loading ...</Box>
        ) : isOpen && Boolean(inputItems.length) ? (
          inputItems.map((item, index) => (
            <Item
              key={`${item}${index}`}
              isHighlighted={highlightedIndex === index}
              {...getItemProps({item, index})}
            >
              {item.name}
            </Item>
          ))
        ) : isOpen && !Boolean(inputItems.length) ? (
          <Box padding="2">Tidak ada item</Box>
        ) : null}
      </Box>
    </Box>
  )
}

const Item = React.forwardRef((props, ref) => {
  const {children, isHighlighted, ...rest} = props
  return (
    <PseudoBox
      padding="2"
      borderBottom="1px"
      borderColor="gray.200"
      _last={{
        borderBottom: 'none'
      }}
      ref={ref}
      backgroundColor={isHighlighted ? 'green.100' : null}
      {...rest}
    >
      {children}
    </PseudoBox>
  )
})

export default DropdownCombobox
