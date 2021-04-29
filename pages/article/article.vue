<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{article.title}}</h1>
        
        <article-meta  :article="article"  :user='user' />

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta  :article="article" :user='user'/>
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <article-comments :article="article" :user='user'  />
          
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import {getArticle} from '/api/article'
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'
import {mapState} from 'vuex'
import MarkdownIt from 'markdown-it'
export default {
  name: 'articleIndex',
  async asyncData({params}){
    const {data} = await await getArticle(params.slug)
    const {article} = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article
    }
  },
  components:{
    ArticleMeta,
    ArticleComments
  },
  computed:{
    ...mapState(['user'])
  },
  head () {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description }
      ]
    }
  }
}
</script>

<style>

</style>