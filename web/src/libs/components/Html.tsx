import type { DOMNode, HTMLReactParserOptions } from 'html-react-parser'

import parse, { attributesToProps, domToReact, Element } from 'html-react-parser'
import Link from 'next/link'

type Pros = {
  html: string
}

const options: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode instanceof Element && domNode.type === 'tag' && domNode.tagName === 'a') {
      const props = attributesToProps(domNode.attribs)
      return (
        <Link {...props} href={domNode.attribs.href} className="text-blue-500 hover:text-blue-500/80">
          {domToReact(domNode.children as DOMNode[])}
        </Link>
      )
    }
  },
}

export function Html({ html }: Pros) {
  return parse(html, options)
}
