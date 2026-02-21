import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useCallback, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const [draftState, setDraftState] =
		useState<ArticleStateType>(defaultArticleState);

	const [appliedState, setAppliedState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleToggleSidebar = useCallback(() => {
		setIsSidebarOpen((prev) => !prev);
	}, []);

	const handleCloseSidebar = useCallback(() => {
		setIsSidebarOpen(false);
	}, []);

	const handleApply = useCallback(() => {
		setAppliedState(draftState);
		setIsSidebarOpen(false);
	}, [draftState]);

	const handleReset = useCallback(() => {
		setDraftState(defaultArticleState);
		setAppliedState(defaultArticleState);
	}, []);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedState.fontFamilyOption.value,
					'--font-size': appliedState.fontSizeOption.value,
					'--font-color': appliedState.fontColor.value,
					'--container-width': appliedState.contentWidth.value,
					'--bg-color': appliedState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				values={draftState}
				onChange={setDraftState}
				onApply={handleApply}
				onReset={handleReset}
				onToggle={handleToggleSidebar}
				onClose={handleCloseSidebar}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
