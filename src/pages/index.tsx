import {Redirect} from '@docusaurus/router';
import {docs} from '@site/docs.config';

export default function Home(): JSX.Element {
  // Redirect to the first docs instance route
  // When the first route is '/', Docusaurus serves docs as the homepage
  // and this redirect becomes a no-op (same page)
  return <Redirect to={docs[0].route} />;
}
