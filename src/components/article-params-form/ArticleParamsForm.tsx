import { MouseEvent, useCallback, useEffect, useRef } from 'react';
import clsx from 'clsx';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;

	values: ArticleStateType;
	onChange: (next: ArticleStateType) => void;

	onToggle: () => void;
	onClose: () => void;

	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	values,
	onChange,
	onToggle,
	onClose,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const sidebarRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleDocumentMouseDown = (event: globalThis.MouseEvent) => {
			const target = event.target as Node | null;

			if (!target) return;
			if (sidebarRef.current && !sidebarRef.current.contains(target)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleDocumentMouseDown);

		return () => {
			document.removeEventListener('mousedown', handleDocumentMouseDown);
		};
	}, [isOpen, onClose]);

	const handleSidebarClick = (e: MouseEvent) => {
		e.stopPropagation();
	};

	const handleSelectChange = useCallback(
		(key: keyof ArticleStateType) => (option: OptionType) => {
			onChange({ ...values, [key]: option });
		},
		[onChange, values]
	);

	const handleApplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply();
	};

	const handleResetSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />

			<aside
				ref={sidebarRef}
				className={clsx(styles.container, isOpen && styles.container_open)}
				onClick={handleSidebarClick}>
				<form
					className={styles.form}
					onSubmit={handleApplySubmit}
					onReset={handleResetSubmit}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={values.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder={defaultArticleState.fontFamilyOption.title}
						onChange={handleSelectChange('fontFamilyOption')}
					/>

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						selected={values.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleSelectChange('fontSizeOption')}
					/>

					<Select
						title='Цвет шрифта'
						selected={values.fontColor}
						options={fontColors}
						placeholder={defaultArticleState.fontColor.title}
						onChange={handleSelectChange('fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={values.backgroundColor}
						options={backgroundColors}
						placeholder={defaultArticleState.backgroundColor.title}
						onChange={handleSelectChange('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						selected={values.contentWidth}
						options={contentWidthArr}
						placeholder={defaultArticleState.contentWidth.title}
						onChange={handleSelectChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
