<template>
  <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form @submit.prevent="submitAddArticle">
            <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title" required>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description" required>
            </fieldset>
            <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="article.body" required></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" v-model="article.tagList" />
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" >
                Publish Article
            </button>
        </form>
      </div>

    </div>
  </div>
</div>

</template>

<script>
import {addArticles,editArticles,getSingleArticle} from '/api/article'
export default {
  name:'editor',
  middleware: 'authenticated',
  data(){
    return{
      article:{
        title: "",
        description: "",
        body: "",
        tagList: "",
      }
    }
  },
  computed:{
    isEdit(){
      return !!this.$route.query.slug
    }
  },
  methods:{
    async submitAddArticle(){
      let res = null
      if(this.isEdit){
        res = await editArticles({
          article:{
            ...this.article,
            tagList: this.article.tagList.split(','),
          }
        },this.$route.query.slug)
      }else{
        res = await addArticles({
          article:{
            ...this.article,
            tagList: this.article.tagList.split(','),
          }
        })
      }
      
      const slug = res.data.article.slug
      this.$router.push({
        name:'article',
        params:{
          slug
        }
      })

    },
    async getSingleArticle(slug){
      const {data} = await getSingleArticle(slug)
      const {article} = data
      article.tagList = article.tagList.join(',')
      this.article = article
    }
  },
  created(){
    this.$route.query.slug && this.getSingleArticle(this.$route.query.slug)
  }

}
</script>

<style>

</style>