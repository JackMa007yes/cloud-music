import React, { memo, useEffect } from 'react'
import ThemeHeaderRCM from '@/components/theme-header-rcm/index'
import TopRanking from '@/components/top-ranking'
import {
    RankingWrapper
} from './style'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getTopListAction } from '../../store/actionCreators'

const index = memo(() => {
    const dispatch = useDispatch()
    const { upRanking, newRanking, originRanking } = useSelector(state => ({
        upRanking: state.getIn(['recommend', 'topUpList']),
        newRanking: state.getIn(['recommend', 'topNewList']),
        originRanking: state.getIn(['recommend', 'topOriginList'])

    }), shallowEqual)

    useEffect(() => {
        dispatch(getTopListAction(0))
        dispatch(getTopListAction(2))
        dispatch(getTopListAction(3))
    }, [dispatch])
  return (
    <RankingWrapper>
        <ThemeHeaderRCM title="榜单" />
        <div className='tops'>
            <TopRanking info={upRanking}></TopRanking>
            <TopRanking info={newRanking}></TopRanking>
            <TopRanking info={originRanking}></TopRanking>
        </div>
    </RankingWrapper>
  )
})

export default index