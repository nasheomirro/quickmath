export const join = (...args: (string | boolean | undefined | null)[]): string => {
	return args.filter((a) => Boolean(a)).join(' ');
};
