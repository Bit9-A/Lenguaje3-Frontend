import React from 'react'
import { CFooter } from '@coreui/react'

import { CContainer } from '@coreui/react'
const AppFooter = () => {
  return (
    <CFooter className="px-4">
          <CContainer className="text-center">
            <p className="mb-0">&copy; 2024 Empresa. Todos los derechos reservados.</p>
          </CContainer>
    </CFooter>
  )
}

export default React.memo(AppFooter)
