<nav>
    <ul>
        <li><a href="/classes">Classes</a></li>
        <li><a href="/units">Units</a></li>
        <li><a href="/build">Build</a></li>
    </ul>
</nav>
<main>
    <slot></slot>
</main>

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
        a:visited,
        button {
            color: #DDD;
            text-decoration: none;
            font-family: sans-serif;
            font-size: 18px;
        }
        a:active {
            color: #777;
            text-decoration: underline;
        }
        button {
            border: 1px solid #667;
            border-radius: 3px;
            background-color: #334;
            padding: 12px 16px 8px 16px;
            cursor: pointer;
            
        }
        button.active {
            background-color: #445;
            color: white;
            background-color: #888;
            cursor: default;
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
    main {
        display: block;
        padding: 16px 8px;
    }
</style>