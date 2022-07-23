# How Shortage is set up

This is very important. Since React Native does not actually play nicely with React (bummer), everything is going to be written with React Native. This is new to me and is going to be interesting to see how to make desktop layouts.
One strong point of React Native is that it knows when the user is on an app vs web. Let's see how useful this really is though, or if I'm going to have to write my stylesheets as if they are CSS-responsive sheets anyway.

Anyways, I wanted to use a framework like Remix to deliver a fast experience to users for the web, but realized that component reuse when trying to blend between React and React Native is difficult, which erases any productivity gains that the component-based architecture was supposed to provide. The only thing you can truly share between a React and React Native app is logic/servers. (And you can't really do that with Remix either).

So much for component-reuse :(

### Beyond this project
That being said, I'm going to take lessons learned from this specific challenge and one day put it to use in creaitng my own framework suited for truly cross platform React development, since I believe that the current solutions are so close, but not yet there from a Dev-Experience perspective.
In the future I'd like this solution to look more like a unified compiler for React and React Native, bridging the two together so the backend can truly be unified and work seamlessly with frameworks like Remix, NextJS, NuxtJS, etc. I don't want to be in the space of creating more frameworks, but rather be a contributor to React and React Native to make it easier to seamlessly flow between the two. Just thinking out loud with this bit.