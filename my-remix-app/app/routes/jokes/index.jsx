import defaultStyles from '~/styles/index.css';

export const links = () => {
  return [{ rel: "stylesheet", href: defaultStyles }];
};

export default function JokesIndexRoute() {
    return (
      <div>
        <p>Here's a random joke:</p>
        <p>
          I was wondering why the frisbee was getting bigger,
          then it hit me.
        </p>
      </div>
    );
}