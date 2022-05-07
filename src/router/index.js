import Discover from '@/pages/discover'
import { Redirect } from 'react-router-dom'
import React from 'react'

import Friends from '@/pages/friends'
import Mine from '@/pages/mine'
import Recommend from "../pages/discover/c-pages/recommend"
import Ranking from "../pages/discover/c-pages/ranking"
import Songs from "../pages/discover/c-pages/songs"
import Djradio from "../pages/discover/c-pages/djradio"
import Artist from "../pages/discover/c-pages/artist"
import Album from "../pages/discover/c-pages/album"
import Player from '../pages/player'


// const Recommend = React.lazy(_ => import("../pages/discover/c-pages/recommend"));
// const Ranking = React.lazy(_ => import("../pages/discover/c-pages/ranking"));
// const Songs = React.lazy(_ => import("../pages/discover/c-pages/songs"));
// const Djradio = React.lazy(_ => import("../pages/discover/c-pages/djradio"));
// const Artist = React.lazy(_ => import("../pages/discover/c-pages/artist"));
// const Album = React.lazy(_ => import("../pages/discover/c-pages/album"));
// const Player = React.lazy(_ => import("../pages/player"));


const routes = [
    {
        path: '/',
        exact: true,
        render: () => (
            <Redirect to='/discover'></Redirect>
        )
    },
    {
        path: '/discover',
        component: Discover,
        routes: [
            {
              path: "/discover",
              exact: true,
              render: () => (
                <Redirect to={"/discover/recommend"}/>
              )
            },
            {
              path: "/discover/recommend",
              component: Recommend
            },
            {
              path: "/discover/ranking",
              component: Ranking
            },
            {
              path: "/discover/songs",
              component: Songs
            },
            {
              path: "/discover/djradio",
              exact: true,
              component: Djradio
            },
            {
              path: "/discover/artist",
              component: Artist
            },
            {
              path: "/discover/album",
              component: Album
            },
            {
              path: "/discover/player",
              component: Player
            }
          ]
    },
    {
        path: '/mine',
        component: Mine
    },
    {
        path: '/friend',
        component: Friends
    },

]

export default routes