/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {action} from '@storybook/addon-actions';
import {Button, Checkbox, CheckboxProps, Collection, Menu, MenuTrigger, Popover, Text, Tree, TreeItem, TreeItemContent, TreeItemProps, TreeProps} from 'react-aria-components';
import {classNames} from '@react-spectrum/utils';
import {MyMenuItem} from './utils';
import React, {ReactNode} from 'react';
import styles from '../example/index.css';

export default {
  title: 'React Aria Components'
};

interface StaticTreeItemProps extends TreeItemProps {
  title?: string,
  children: ReactNode
}

function MyCheckbox({children, ...props}: CheckboxProps) {
  return (
    <Checkbox {...props}>
      {({isIndeterminate}) => (
        <>
          <div className="checkbox">
            <svg viewBox="0 0 18 18" aria-hidden="true">
              {isIndeterminate
                ? <rect x={1} y={7.5} width={15} height={3} />
                : <polyline points="1 9 7 14 15 4" />}
            </svg>
          </div>
          {children}
        </>
      )}
    </Checkbox>
  );
}

const StaticTreeItem = (props: StaticTreeItemProps) => {
  return (
    <TreeItem
      {...props}
      className={({isFocused, isSelected, isHovered, isFocusVisible}) => classNames(styles, 'tree-item', {
        focused: isFocused,
        'focus-visible': isFocusVisible,
        selected: isSelected,
        hovered: isHovered
      })}>
      <TreeItemContent>
        {({isExpanded, hasChildRows, level, selectionMode, selectionBehavior}) => (
          <>
            {selectionMode !== 'none' && selectionBehavior === 'toggle' && (
              <MyCheckbox slot="selection" />
            )}
            <div
              className={classNames(styles, 'content-wrapper')}
              style={{marginInlineStart: `${(!hasChildRows ? 20 : 0) + (level - 1) * 15}px`}}>
              {hasChildRows && <Button className={styles.chevron} slot="chevron">{isExpanded ? '⏷' : '⏵'}</Button>}
              <Text className={styles.title}>{props.title || props.children}</Text>
              <Button className={styles.button} aria-label="Info" onPress={action('Info press')}>ⓘ</Button>
              <MenuTrigger>
                <Button aria-label="Menu">☰</Button>
                <Popover>
                  <Menu className={styles.menu} onAction={action('menu action')}>
                    <MyMenuItem>Foo</MyMenuItem>
                    <MyMenuItem>Bar</MyMenuItem>
                    <MyMenuItem>Baz</MyMenuItem>
                  </Menu>
                </Popover>
              </MenuTrigger>
            </div>
          </>
        )}
      </TreeItemContent>
      {props.title && props.children}
    </TreeItem>
  );
};

export const TreeExampleStatic = (args) => (
  <Tree  className={styles.tree} {...args} disabledKeys={['projects']} aria-label="test static tree" onExpandedChange={action('onExpandedChange')} onSelectionChange={action('onSelectionChange')}>
    <StaticTreeItem id="Photos" textValue="Photos">Photos</StaticTreeItem>
    <StaticTreeItem id="projects" textValue="Projects" title="Projects">
      <StaticTreeItem id="projects-1" textValue="Projects-1" title="Projects-1">
        <StaticTreeItem id="projects-1A" textValue="Projects-1A">
          Projects-1A
        </StaticTreeItem>
      </StaticTreeItem>
      <StaticTreeItem id="projects-2" textValue="Projects-2">
        Projects-2
      </StaticTreeItem>
      <StaticTreeItem id="projects-3" textValue="Projects-3">
        Projects-3
      </StaticTreeItem>
    </StaticTreeItem>
    <TreeItem
      id="reports"
      textValue="Reports"
      className={({isFocused, isSelected, isHovered, isFocusVisible}) => classNames(styles, 'tree-item', {
        focused: isFocused,
        'focus-visible': isFocusVisible,
        selected: isSelected,
        hovered: isHovered
      })}>
      <TreeItemContent>
        Reports
      </TreeItemContent>
    </TreeItem>
    <TreeItem
      id="Tests"
      textValue="Tests"
      className={({isFocused, isSelected, isHovered, isFocusVisible}) => classNames(styles, 'tree-item', {
        focused: isFocused,
        'focus-visible': isFocusVisible,
        selected: isSelected,
        hovered: isHovered
      })}>
      <TreeItemContent>
        {({isFocused}) => (
          <Text>{`${isFocused} Tests`}</Text>
        )}
      </TreeItemContent>
    </TreeItem>
  </Tree>
);

TreeExampleStatic.story = {
  args: {
    selectionMode: 'none',
    selectionBehavior: 'toggle',
    disabledBehavior: 'selection'
  },
  argTypes: {
    selectionMode: {
      control: {
        type: 'radio',
        options: ['none', 'single', 'multiple']
      }
    },
    selectionBehavior: {
      control: {
        type: 'radio',
        options: ['toggle', 'replace']
      }
    },
    disabledBehavior: {
      control: {
        type: 'radio',
        options: ['selection', 'all']
      }
    }
  },
  parameters: {
    description: {
      data: 'Note that the last two items are just to test bare minimum TreeItem and thus dont have the checkbox or any of the other contents that the other items have. The last item tests the isFocused renderProp'
    }
  }
};

let rows = [
  {id: 'projects', name: 'Projects', childItems: [
    {id: 'project-1', name: 'Project 1'},
    {id: 'project-2', name: 'Project 2', childItems: [
      {id: 'project-2A', name: 'Project 2A'},
      {id: 'project-2B', name: 'Project 2B'},
      {id: 'project-2C', name: 'Project 2C'}
    ]},
    {id: 'project-3', name: 'Project 3'},
    {id: 'project-4', name: 'Project 4'},
    {id: 'project-5', name: 'Project 5', childItems: [
      {id: 'project-5A', name: 'Project 5A'},
      {id: 'project-5B', name: 'Project 5B'},
      {id: 'project-5C', name: 'Project 5C'}
    ]}
  ]},
  {id: 'reports', name: 'Reports', childItems: [
    {id: 'reports-1', name: 'Reports 1', childItems: [
      {id: 'reports-1A', name: 'Reports 1A', childItems: [
        {id: 'reports-1AB', name: 'Reports 1AB', childItems: [
          {id: 'reports-1ABC', name: 'Reports 1ABC'}
        ]}
      ]},
      {id: 'reports-1B', name: 'Reports 1B'},
      {id: 'reports-1C', name: 'Reports 1C'}
    ]},
    {id: 'reports-2', name: 'Reports 2'}
  ]}
];

interface DynamicTreeItemProps extends TreeItemProps<object> {
  children: ReactNode
}

const DynamicTreeItem = (props: DynamicTreeItemProps) => {
  let {childItems} = props;

  return (
    <TreeItem
      {...props}
      className={({isFocused, isSelected, isHovered, isFocusVisible}) => classNames(styles, 'tree-item', {
        focused: isFocused,
        'focus-visible': isFocusVisible,
        selected: isSelected,
        hovered: isHovered
      })}>
      <TreeItemContent>
        {({isExpanded, hasChildRows, level, selectionBehavior, selectionMode}) => (
          <>
            {selectionMode !== 'none' && selectionBehavior === 'toggle' && (
              <MyCheckbox slot="selection" />
            )}
            <div className={styles['content-wrapper']} style={{marginInlineStart: `${(!hasChildRows ? 20 : 0) + (level - 1) * 15}px`}}>
              {hasChildRows && <Button slot="chevron">{isExpanded ? '⏷' : '⏵'}</Button>}
              <Text>{props.children}</Text>
              <Button className={styles.button} aria-label="Info" onPress={action('Info press')}>ⓘ</Button>
              <MenuTrigger>
                <Button aria-label="Menu">☰</Button>
                <Popover>
                  <Menu className={styles.menu} onAction={action('menu action')}>
                    <MyMenuItem>Foo</MyMenuItem>
                    <MyMenuItem>Bar</MyMenuItem>
                    <MyMenuItem>Baz</MyMenuItem>
                  </Menu>
                </Popover>
              </MenuTrigger>
            </div>
          </>
        )}
      </TreeItemContent>
      <Collection items={childItems}>
        {(item: any) => (
          <DynamicTreeItem childItems={item.childItems} textValue={item.name} href={props.href}>
            {item.name}
          </DynamicTreeItem>
        )}
      </Collection>
    </TreeItem>
  );
};

let defaultExpandedKeys = new Set(['projects', 'project-2', 'project-5', 'reports', 'reports-1', 'reports-1A', 'reports-1AB']);

export const TreeExampleDynamic = (args: TreeProps<unknown>) => (
  <Tree {...args} defaultExpandedKeys={defaultExpandedKeys} disabledKeys={['reports-1AB']} className={styles.tree} aria-label="test dynamic tree" items={rows} onExpandedChange={action('onExpandedChange')} onSelectionChange={action('onSelectionChange')}>
    {(item) => (
      <DynamicTreeItem childItems={item.childItems} textValue={item.name}>
        {item.name}
      </DynamicTreeItem>
    )}
  </Tree>
);

TreeExampleDynamic.story = {
  ...TreeExampleStatic.story,
  parameters: null
};

export const WithActions = {
  render: TreeExampleDynamic,
  ...TreeExampleDynamic,
  args: {
    onAction: action('onAction'),
    ...TreeExampleDynamic.story.args
  },
  name: 'Tree with actions'
};

export const WithLinks = (args: TreeProps<unknown>) => (
  <Tree {...args} defaultExpandedKeys={defaultExpandedKeys} className={styles.tree} aria-label="test dynamic tree" items={rows} onExpandedChange={action('onExpandedChange')} onSelectionChange={action('onSelectionChange')}>
    {(item) => (
      <DynamicTreeItem href="https://adobe.com/" childItems={item.childItems} textValue={item.name}>
        {item.name}
      </DynamicTreeItem>
    )}
  </Tree>
);

WithLinks.story = {
  ...TreeExampleDynamic.story,
  name: 'Tree with links',
  parameters: {
    description: {
      data: 'every tree item should link to adobe.com'
    }
  }
};

interface ItemType {
  childItems: Iterable<object>,
  name: string
}
export const EmptyTree = (args: TreeProps<unknown>) => (
  <Tree
    {...args}
    className={styles.tree}
    aria-label="test dynamic tree"
    items={[]}
    renderEmptyState={() => <span>Nothing in tree</span>}>
    {(item: ItemType) => (
      <DynamicTreeItem childItems={item?.childItems} textValue={item?.name}>
        {item?.name}
      </DynamicTreeItem>
    )}
  </Tree>
);
