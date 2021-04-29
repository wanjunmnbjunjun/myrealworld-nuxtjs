<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">超💗君</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link 
                  class="nav-link" 
                  :class="{
                    active:tab === 'your_feed'
                  }"
                  :to="{
                    name:'home',
                    query:{
                      tab: 'your_feed'
                    }
                  }"
                  exact
                  >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link 
                  class="nav-link" 
                  :class="{
                    active:tab === 'global_feed'
                  }"
                  :to="{
                    name:'home',
                    query:{
                      tab: 'global_feed'
                    }
                  }"
                  exact
                  >Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link 
                  class="nav-link active" 
                  :class="{
                    active:tab === 'tag'
                  }"
                  :to="{
                    name:'home',
                    query:{
                      tab: 'tag',
                      tag: tag
                    }
                  }"
                  exact
                  ># {{tag}}</nuxt-link>
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


        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link 
                v-for="(tag,index) in tags" 
                :key='index' 
                :to="{
                  name:'home',
                  query:{
                    tag:tag,
                    tab:'tag'
                  }
                }" 
                class="tag-pill tag-default">{{tag}}</nuxt-link>
            </div>
          </div>
        </div>
        <nav>
          <ul class="pagination">
            <li class="page-item ng-scope " :class="{active: page === item}"  v-for="item in totalPage" :key="item">
              <nuxt-link 
              class="page-link ng-binding" 
              :to="{ 
                name:'home',
                query:{
                  page:item,
                  tag:tag,
                  tab:tab
                }
              }">{{item}}</nuxt-link>
            </li>
          </ul>
        </nav>

      </div>
    </div>

  </div>
  
</template>
<script>
import {getArticles,getFeedArticles,unfavoriteArticle,favoriteArticle} from '/api/article'
import {getTags} from '/api/tag'
import {mapState} from 'vuex'
export default {
  name:'home',
  async asyncData({query}){
    const limit = 10
    const page = Number.parseInt(query.page || 1)
    const tag = query.tag 
    const tab = query.tab ||'global_feed'
    const loadArticles = tab === 'your_feed' ? getFeedArticles:getArticles
    const [{data:articlesData},{data:tagsData}] = await Promise.all([
      loadArticles({
        limit,
        offset: (page-1)*limit,
        tag
      }),
      getTags()
    ])
    const {articles,articlesCount} = articlesData
    const {tags} = tagsData
    const totalPage = Math.ceil(articlesCount/limit)
    articles.forEach(article => {
      article.favoritDisabled = false
    });
    return {
      articles, //文章列表
      tags, //文章标签
      totalPage, //总页数
      page, //当前页
      tag, //当前标签
      tab //当前选项卡
    }
    
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed:{
    ...mapState(['user'])
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
    }
  }

}
</script>

<style>

</style>