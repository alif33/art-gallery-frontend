import React, { useEffect } from "react"
import Layout from "../../components/Layout"

const Artworks = ()=>{
    
    const images = [
        'https://images.unsplash.com/photo-1680145900353-1b8b072c18bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1685391317670-8fdb5382a492?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=489&q=80',
        'https://images.unsplash.com/photo-1685384525692-45a52ca300a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80',
        'https://images.unsplash.com/photo-1685391317670-8fdb5382a492?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=489&q=80',
        'https://images.unsplash.com/photo-1685391317670-8fdb5382a492?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=489&q=80',
        'https://images.unsplash.com/photo-1685384525692-45a52ca300a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80',
        'https://images.unsplash.com/photo-1685391317670-8fdb5382a492?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=489&q=80',
        'https://images.unsplash.com/photo-1685384525692-45a52ca300a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80',
        'https://images.unsplash.com/photo-1685391317670-8fdb5382a492?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=489&q=80',

    ]

    return(
        <Layout>

            <div class="masonry-grid">
                {
                    images.map((img, index)=><div key={index} class="grid-item"><img src={img} alt="Image 1"/></div>)
                }
            </div>            
        </Layout>
    )
}
export default Artworks