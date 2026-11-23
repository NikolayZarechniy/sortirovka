import './post.css'

type PostProps = {
    title: string,
    date: string
}

export default function Post(props: PostProps){
    return(
        <article className="post">
            <h3>{props.title}</h3>
            <section className="post__meta">
                <span className="post__meta__item">{props.date}</span>
                <span className="post__meta__item">Design, Pattern</span>
            </section>
            <p>
                Amet mihij mollit not deserunt ullamco est sut alio
            </p>
        </article>
    )
}