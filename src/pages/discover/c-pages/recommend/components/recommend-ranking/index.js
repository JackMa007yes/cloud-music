import React, { memo } from 'react'
import ThemeHeaderRCM from '@/components/theme-header-rcm/index'

import {
    RankingWrapper
} from './style'

const index = memo(() => {
  return (
    <RankingWrapper>
        <ThemeHeaderRCM title="榜单" >
        </ThemeHeaderRCM>
    </RankingWrapper>
  )
})

export default index