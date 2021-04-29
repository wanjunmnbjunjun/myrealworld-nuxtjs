<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{profile.username}}</h4>
          <p>
            {{profile.bio}}
          </p>
          <button 
            class="btn btn-sm btn-outline-secondary action-btn" 
            :disabled = 'profile.followed'
            @click="onFollow(profile)" >
            <i class="ion-plus-round"></i>
            &nbsp;
            {{profile.following?'Unfollow':'Follow'}} {{profile.username}}
          </button>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link 
                class="nav-link"
                :class="{active: tab === 'my_articles'}" 
                exact
                :to="{
                  name:'profile',
                  params:{
                    username,
                  },
                  query:{
                    tab: 'my_articles'
                  }
                }"
              >My Articles</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link 
                class="nav-link" 
                :class="{active: tab === 'favorited_articles'}" 
                exact
                :to="{
                  name:'profile',
                  params:{
                    username,
                  },
                  query:{
                    tab: 'favorited_articles'
                  }
                }"
              >Favorited Articles</nuxt-link>
            </li>
          </ul>
        </div>


        <div class="article-preview" v-for="article in articles" :key="article.slug">
          <div class="article-meta">
            <nuxt-link  :to="{
                name:'profile',
                params: {
                  username: article.author.username
                }
              }">
              <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
              <nuxt-link 
                class="author"
                :to="{
                  name:'profile',
                  params: {
                    username: article.author.username
                  }
                }"
              >
                {{article.author.username}}
              </nuxt-link>
              <span class="date">{{article.createdAt| date('MMM DD, YYYY') }}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right " :class="{active: article.favorited}" :disabled='article.favoritDisabled'  @click="onFavorite(article)">
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link 
            class="preview-link"
            :to="{
              name:'article',
              params: {
                slug: article.slug
              }
            }"
          >
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>
        <nav>
          <ul class="pagination">
            <li class="page-item ng-scope " :class="{active: page === item}"  v-for="item in totalPage" :key="item">
              <nuxt-link 
              class="page-link ng-binding" 
              :to="{
                  name:'profile',
                  params:{
                    username,
                  },
                  query:{
                    tab: tab,
                    page:item
                  }
                }"
              >{{item}}</nuxt-link>
            </li>
          </ul>
        </nav>


      </div>

    </div>
  </div>

</div>

</template>

<script>
import {getArticles,unfavoriteArticle,favoriteArticle} from '/api/article'
import { getProfilesByUsername,unfollowUser, followUser} from "/api/profiles";
import {mapState} from 'vuex'
export default {
  name: 'profile',
  watchQuery: ['page','tab'],
  computed:{
    ...mapState(['user'])
  },
  async asyncData({params,query}){
    const username = params.username
    const tab = query.tab ||'my_articles'
    const page = Number.parseInt(query.page || 1)
    const limit = 10
    const [articlesData,profileData] = await Promise.all([
      await getArticles({
        author: tab === 'my_articles'?username:'',
        favorited:tab === 'favorited_articles'?username:'',
        limit,
        offset: (page-1)*limit,
      }),
      await getProfilesByUsername(username)

    ])
    const {profile} = profileData.data
    const {articles,articlesCount} = articlesData.data
    articles.forEach(article => {
      article.favoritDisabled = false
    });
    const totalPage = Math.ceil(articlesCount/limit)
    profile.followed = false
    return{
      username,
      tab,
      page,
      articles,
      articlesCount,
      totalPage,
      profile
    }

  },
  methods:{
    async onFavorite(article){
      if(!this.user){
        this.$router.push({
          name: 'login'
        })
        return
      }
      article.favoritDisabled = true
      if(article.favorited){
        await unfavoriteArticle(article.slug)
        article.favoritesCount -=1
         
      }else{
        await favoriteArticle(article.slug)
        article.favoritesCount +=1
      }
      article.favorited = !article.favorited
      article.favoritDisabled = false
    },
    async onFollow(profile){
      if(!this.user){
        this.$router.push({
          name: 'login'
        })
        return
      }
      profile.followed = true
      if(profile.following){
        await unfollowUser(profile.username)
          
      }else{
        await followUser(profile.username)
      }
      profile.following = !profile.following
      profile.followed = false

    }
  },
  

}
</script>

<style>

</style>