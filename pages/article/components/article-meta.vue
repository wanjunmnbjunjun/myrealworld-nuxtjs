<template>
  <div class="article-meta">
    <a href=""><img :src="article.author.image" /></a>
    <div class="info">
      <a href="" class="author">{{article.author.username}}</a>
      <span class="date">{{article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <span  v-if="user&&user.username === article.author.username">
      <nuxt-link 
        class="btn btn-outline-secondary btn-sm"  
        :to="{
          name:'editor',
          query:{
            slug:article.slug
          }
        }">
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      <button class="btn btn-outline-danger btn-sm"  @click="deleteArticles">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </span>
    <span v-else>
      <button class="btn btn-sm btn-outline-secondary">
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow {{article.author.username}} <span class="counter">({{article.favoritesCount}})</span>
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">(29)</span>
      </button>
    </span>

    
  </div>
</template>

<script>
import {deleteArticles} from '/api/article'
export default {
  name:'ArticleMeta',
  props:{
    article:{
      type: Object,
      required: true
    },
    user:{
      type: Object
    }
  },
  methods:{
    async deleteArticles(){
      await deleteArticles(this.article.slug)
      this.$router.push({
        name:'home'
      })
    }
  }

}
</script>

<style>

</style>