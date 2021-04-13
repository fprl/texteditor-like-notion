import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Resizable } from 're-resizable'

import BlockAction from './BlockAction'

const Sidebar = ({ links }) => {
  const [width, setWidth] = React.useState(192)

  return (
    <Nav>
      <StickyNav>
        <ResizableContainer
          size={{ width }}
          onResizeStop={(e, direction, ref, d) => {
            setWidth(width + d.width)
          }}
          enable={{
            top: false,
            right: true,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
        >
          <LinksList>
            {links && (
              <>
                {links.map(link => (
                  <LinkItem key={link.id} to={`/${link.id}`} activeClassName='a'>
                    <ContentWrapper>
                      {link.title}
                      <ActionsWrapper>
                        <BlockAction
                          type='three-dots'
                          color='gray'
                          onClick={e => e.preventDefault()}
                        />
                        <BlockAction
                          type='plus'
                          color='gray'
                          onClick={e => e.preventDefault()}
                        />
                      </ActionsWrapper>
                    </ContentWrapper>
                  </LinkItem>
                ))}
              </>
            )}
          </LinksList>
        </ResizableContainer>
      </StickyNav>
    </Nav>
  )
}

export default Sidebar

const Nav = styled.aside`
  position: relative;
  display: flex;
`

const StickyNav = styled.div`
  position: sticky;
  top: 0;
  left: 0;

  height: 100vh;
  background-color: var(--color-gray-25);
`

const ResizableContainer = styled(Resizable)`
  display: flex !important;
  flex-direction: column !important;

  min-width: 12rem !important;
  max-width: 25rem !important;
  height: 100% !important;

  :first-child:hover {
    border-right: 2px solid var(--color-gray);
  }
`

const LinksList = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;
`

const LinkItem = styled(NavLink)`
  font-size: var(--text-sm);
  color: var(--color-text);
  text-decoration: none;

  &.${p => p.activeClassName} {
    background-color: var(--color-hover-85);
    font-weight: 600;
  }

  :active {
    background-color: black;
  }

  :hover {
    background-color: var(--color-hover-85);
  }
`
const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  min-height: 2rem;
  margin: 0 var(--spacing-s);
`

const ActionsWrapper = styled.div`
  display: flex;

  ${LinkItem}:hover & {
    #block-action {
      visibility: visible;

      &:hover {
        background-color: var(--color-gray);
      }
    }
  }
`
