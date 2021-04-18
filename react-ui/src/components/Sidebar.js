import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Resizable } from 're-resizable'

import BlockAction from './BlockAction'

const Sidebar = ({ links, addPage }) => {
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
                  <LinkItem
                    key={link.id}
                    to={`/${link.id}`}
                    activeClassName="active"
                  >
                    <ContentWrapper>
                      {link.title}
                      <ActionsWrapper>
                        <BlockAction
                          type="plus"
                          color="gray"
                          onClick={e => {
                            e.preventDefault()
                            addPage(link.id)
                          }}
                        />
                        <BlockAction
                          type="three-dots"
                          color="gray"
                          onClick={e => e.preventDefault()}
                        />
                      </ActionsWrapper>
                    </ContentWrapper>
                  </LinkItem>
                ))}
              </>
            )}
          </LinksList>
          <Button onClick={e => {
            e.preventDefault()
            addPage()
          }}>
            <BlockAction
              type="plus"
              color="gray"
            />
            New page
          </Button>
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
  justify-content: space-between;

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
  flex-grow: 2;

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

const Button = styled.button`
  display: flex;
  align-items: center;
  flex-grow: 0;

  height: calc(var(--spacing-s) * 3);
  padding: 0 var(--spacing-s);

  border: none;
  border-top: 1px solid var(--color-hover-85);

  font-size: var(--text-sm);
  color: var(--color-text);

  div {
    visibility: visible;
    margin-right: var(--spacing-xs);

    &:hover {
      background-color: var(--color-hover-85);
    }
  }

  :hover {
    background-color: var(--color-hover-85);
  }
`
