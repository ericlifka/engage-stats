<nav>
    <ul>
        <li><a href="/units">Units</a></li>
        <li><a href="/classes">Classes</a></li>
    </ul>
</nav>
<content>
    <slot></slot>
</content>

<svelte:head>
    <style>
        body {
            padding: 0;
            margin: 0;
            background-color: #333;
            color: #DDD;
            font-family: sans-serif;
            font-size: 18px;
        }
        a,
        a:hover,
        a:visited {
            color: #DDD;
            text-decoration: none;
        }
        a:active {
            color: #777;
            text-decoration: underline;
        }
    </style>
</svelte:head>

<style>
    nav {
        display: flex;
        justify-content: space-around;
        background-color: #334;
        border-bottom: 1px solid #667;
    }
    ul {
        display: flex;
        list-style: none;
        padding: 0;
    }
    li {
        padding: 4px 12px;
        margin: 0;
    }
    content {
        display: block;
        padding: 16px 8px;
    }
</style>