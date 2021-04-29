<template>
  <div>
    <form class="card comment-form" v-if="user">
      <div class="card-block">
        <textarea class="form-control" v-model="commentbody" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <!-- <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" /> -->
        <button class="btn btn-sm btn-primary" type="button"  @click="getAddArticlesComments">
        Post Comment
        </button>
      </div>
    </form>
    
    

    <div class="card"  v-for="(comment,index) in comments" :key="index">
      <div class="card-block">
        <p class="card-text">{{comment.body}}</p>
      </div>
      <div class="card-footer">
        <a href="" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </a>
        &nbsp;
        <a href="" class="comment-author">{{comment.author.username}}</a>
        <span class="date-posted">{{comment.createdAt| date('MMM DD, YYYY') }}</span>
        <span class="mod-options" v-if="comment.author.username == user.username" @click="deleteComment(comment.id)">
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {addArticlesComments,getComments,deleteArticlesComments} from '/api/article'
export default {
  name:'ArticleComments',
  props:{
    article:{
      type: Object,
      required: true
    },
    user:{
      type: Object
    }
  },
  data(){
    return{
      commentbody:'',
      comments:[],
    }
  },
  methods:{
    async getAddArticlesComments(){
      if(!this.commentbody.trim()){
        return
      }
      await addArticlesComments({
        comment:{
          body: this.commentbody
        }

      },this.article.slug)
      this.commentbody = ''
      this.getCommentsData()
      
    },
    async getCommentsData(){
      const {data} = await getComments(this.article.slug)
      this.comments = data.comments

    },
    async deleteComment(id){
      await deleteArticlesComments(this.article.slug,id)
      this.getCommentsData()

    }
  },
  mounted(){
    this.getCommentsData()
  }

}
</script>

<style>

</style>