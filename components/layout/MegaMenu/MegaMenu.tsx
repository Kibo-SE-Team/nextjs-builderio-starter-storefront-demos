import React, { useState, useEffect } from 'react'

import { Box, Divider, ListItem, ListItemText, Typography, Toolbar, styled } from '@mui/material'
import { usePopupState, bindHover, bindPopover } from 'material-ui-popup-state/hooks'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import { useTranslation } from 'next-i18next'

import KiboImage from '@/components/common/KiboImage/KiboImage'
import MegaMenuItem from '@/components/layout/MegaMenuItem/MegaMenuItem'
import DefaultImage from '@/public/product_placeholder.svg'

import { PrCategory } from '@/lib/gql/types'
interface MegaMenuProps {
  categoryTree: PrCategory[]
  onBackdropToggle: (isOpen: boolean) => void
}

interface MegaMenuCategoryProps {
  category: PrCategory
  activeCategory: string
  onBackdropToggle: (isOpen: boolean) => void
  setActiveCategory: (activeCategory: string) => void
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  '&.MuiToolbar-root': {
    backgroundColor: theme.palette.common.white,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 59,
    display: 'flex',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey[300],
    paddingInline: 26,
    flexWrap: 'wrap',
    gap: '4%',
  },
}))

const style = {
  listItem: {
    paddingInline: 0.75,
    paddingTop: 2.25,
    paddingBottom: 1.25,
    cursor: 'pointer',
    borderBottom: '4px solid transparent',
    '&.Mui-selected': {
      borderBottom: '4px solid',
      borderBottomColor: 'primary.main',
      background: 'transparent',
      '& .MuiTypography-root': {
        textShadow: '0.7px 0px',
      },
    },
  },
  popoverPaper: {
    width: '96.5vw',
    minHeight: 100,
    borderRadius: 0,
    boxShadow: 'none',
    borderTop: '1px solid',
    borderTopColor: 'grey.300',
  },
}

const MegaMenuCategory = (props: MegaMenuCategoryProps) => {
  const { category, onBackdropToggle, activeCategory, setActiveCategory } = props
  const childrenCategories = category.childrenCategories as PrCategory[]

  const { t } = useTranslation('common')

  const popupState = usePopupState({
    variant: 'popover',
    popupId: category.content?.name,
  })

  useEffect(() => {
    childrenCategories.length && onBackdropToggle(popupState.isOpen)
  }, [childrenCategories.length, popupState.isOpen, onBackdropToggle])

  return (
    <Box {...bindHover(popupState)} role="group" color="grey.900">
      <ListItem
        sx={{ ...style.listItem }}
        onMouseOver={() => setActiveCategory(category.categoryCode || '')}
        selected={popupState.isOpen && category.categoryCode === activeCategory}
      >
        <ListItemText primary={category.content?.name} />
      </ListItem>
      {childrenCategories.length > 0 && (
        <HoverPopover
          {...bindPopover(popupState)}
          PaperProps={{ sx: { ...style.popoverPaper } }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box display="flex" py={2}>
            <Box display="flex" flex={3} flexWrap={'wrap'}>
              {childrenCategories?.map((cat) => {
                return (
                  <MegaMenuItem
                    key={cat?.categoryCode}
                    title={cat?.content?.name as string}
                    categoryChildren={cat?.childrenCategories as PrCategory[]}
                    categoryCode={cat?.categoryCode as string}
                  />
                )
              })}
            </Box>
            <Divider orientation="vertical" sx={{ minHeight: '20rem', height: '20rem' }} />
            <Box flex={1} px={4}>
              <Box width={'100%'}>
                <Typography variant="subtitle2" pt={0.5} fontWeight="bold">
                  {t('advertisment')}
                </Typography>
                <KiboImage
                  src={DefaultImage}
                  alt={t('advertisment')}
                  width={'100%'}
                  height={'100%'}
                />
              </Box>
            </Box>
          </Box>
        </HoverPopover>
      )}
    </Box>
  )
}

const MegaMenu = (props: MegaMenuProps) => {
  const { categoryTree, onBackdropToggle } = props

  const [activeCategory, setActiveCategory] = useState<string>('')

  return (
    <StyledToolbar data-testid="megamenu-container">
      {categoryTree?.map((category) => (
        <MegaMenuCategory
          key={category.categoryCode}
          category={category}
          onBackdropToggle={onBackdropToggle}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      ))}
    </StyledToolbar>
  )
}
export default MegaMenu