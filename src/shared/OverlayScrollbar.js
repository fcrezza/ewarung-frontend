import React from 'react'
import {OverlayScrollbarsComponent} from 'overlayscrollbars-react'
import 'overlayscrollbars/css/OverlayScrollbars.css'

function OverlayScrollbar({children}) {
  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: {
          autoHide: 'move',
          autoHideDelay: 300
        }
      }}
    >
      {children}
    </OverlayScrollbarsComponent>
  )
}

export default OverlayScrollbar
