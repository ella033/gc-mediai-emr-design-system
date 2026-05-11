import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ColorSwatch from './components/ColorSwatch.vue'
import SemanticColorTable from './components/SemanticColorTable.vue'
import SpacingScale from './components/SpacingScale.vue'
import RadiusPreview from './components/RadiusPreview.vue'
import ShadowPreview from './components/ShadowPreview.vue'
import LayoutDiagram from './components/LayoutDiagram.vue'
import InputStates from './components/InputStates.vue'
import ButtonStates from './components/ButtonStates.vue'
import BadgeStates from './components/BadgeStates.vue'
import TabStates from './components/TabStates.vue'
import ToastStates from './components/ToastStates.vue'
import ModalStates from './components/ModalStates.vue'
import TableStates from './components/TableStates.vue'
import IconPreview from './components/IconPreview.vue'
import SvgIcon from './components/SvgIcon.vue'
import NumberStepperStates from './components/NumberStepperStates.vue'
import TextAreaStates from './components/TextAreaStates.vue'
import CheckboxStates from './components/CheckboxStates.vue'
import IconButtonStates from './components/IconButtonStates.vue'
import TooltipStates from './components/TooltipStates.vue'
import PaginationStates from './components/PaginationStates.vue'
import ProgressStates from './components/ProgressStates.vue'
import MenuStates from './components/MenuStates.vue'
import MedicationTimeline from './components/MedicationTimeline.vue'
import VitalChart from './components/VitalChart.vue'
import AdherenceHeatmap from './components/AdherenceHeatmap.vue'
import ClinicalTimeline from './components/ClinicalTimeline.vue'
import EmrScreen from './components/EmrScreen.vue'
import DateTimePickerStates from './components/DateTimePickerStates.vue'
import SelectStates from './components/SelectStates.vue'
import DataGridStates from './components/DataGridStates.vue'
import DrawerStates from './components/DrawerStates.vue'
import AvatarStates from './components/AvatarStates.vue'
import ModalAnatomy from './components/ModalAnatomy.vue'
import DateTimePickerParts from './components/DateTimePickerParts.vue'
import SelectParts from './components/SelectParts.vue'
import DataGridParts from './components/DataGridParts.vue'
import DrawerParts from './components/DrawerParts.vue'
import AvatarParts from './components/AvatarParts.vue'
import CardSlotWidgets from './components/CardSlotWidgets.vue'
import AccordionStates from './components/AccordionStates.vue'
import PopoverStates from './components/PopoverStates.vue'
import TransferStates from './components/TransferStates.vue'
import ScrollBarStates from './components/ScrollBarStates.vue'
import ListStates from './components/ListStates.vue'
import TreeStates from './components/TreeStates.vue'
import ColorUsageExamples from './components/ColorUsageExamples.vue'
import FreeTextStates from './components/FreeTextStates.vue'
import EmrGlossary from './components/EmrGlossary.vue'
import EmrScenarios from './components/EmrScenarios.vue'
import EmrRoles from './components/EmrRoles.vue'
import PrescriptionGridExample from './components/PrescriptionGridExample.vue'
import MasterDataGridExample from './components/MasterDataGridExample.vue'
import BillingGridExample from './components/BillingGridExample.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ColorSwatch', ColorSwatch)
    app.component('SemanticColorTable', SemanticColorTable)
    app.component('SpacingScale', SpacingScale)
    app.component('RadiusPreview', RadiusPreview)
    app.component('ShadowPreview', ShadowPreview)
    app.component('LayoutDiagram', LayoutDiagram)
    app.component('InputStates', InputStates)
    app.component('ButtonStates', ButtonStates)
    app.component('BadgeStates', BadgeStates)
    app.component('TabStates', TabStates)
    app.component('ToastStates', ToastStates)
    app.component('ModalStates', ModalStates)
    app.component('TableStates', TableStates)
    app.component('IconPreview', IconPreview)
    app.component('SvgIcon', SvgIcon)
    app.component('NumberStepperStates', NumberStepperStates)
    app.component('TextAreaStates', TextAreaStates)
    app.component('CheckboxStates', CheckboxStates)
    app.component('IconButtonStates', IconButtonStates)
    app.component('TooltipStates', TooltipStates)
    app.component('PaginationStates', PaginationStates)
    app.component('ProgressStates', ProgressStates)
    app.component('MenuStates', MenuStates)
    app.component('MedicationTimeline', MedicationTimeline)
    app.component('VitalChart', VitalChart)
    app.component('AdherenceHeatmap', AdherenceHeatmap)
    app.component('ClinicalTimeline', ClinicalTimeline)
    app.component('EmrScreen', EmrScreen)
    app.component('DateTimePickerStates', DateTimePickerStates)
    app.component('SelectStates', SelectStates)
    app.component('DataGridStates', DataGridStates)
    app.component('DrawerStates', DrawerStates)
    app.component('AvatarStates', AvatarStates)
    app.component('ModalAnatomy', ModalAnatomy)
    app.component('DateTimePickerParts', DateTimePickerParts)
    app.component('SelectParts', SelectParts)
    app.component('DataGridParts', DataGridParts)
    app.component('DrawerParts', DrawerParts)
    app.component('AvatarParts', AvatarParts)
    app.component('CardSlotWidgets', CardSlotWidgets)
    app.component('AccordionStates', AccordionStates)
    app.component('PopoverStates', PopoverStates)
    app.component('TransferStates', TransferStates)
    app.component('ScrollBarStates', ScrollBarStates)
    app.component('ListStates', ListStates)
    app.component('TreeStates', TreeStates)
    app.component('ColorUsageExamples', ColorUsageExamples)
    app.component('FreeTextStates', FreeTextStates)
    app.component('EmrGlossary', EmrGlossary)
    app.component('EmrScenarios', EmrScenarios)
    app.component('EmrRoles', EmrRoles)
    app.component('PrescriptionGridExample', PrescriptionGridExample)
    app.component('MasterDataGridExample', MasterDataGridExample)
    app.component('BillingGridExample', BillingGridExample)
  }
}
