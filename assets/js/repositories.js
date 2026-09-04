document.addEventListener('DOMContentLoaded', () => {
    const apiBase = 'https://api.github.com';
    const numberFormat = new Intl.NumberFormat(document.documentElement.lang || 'en', {
        notation: 'compact',
        maximumFractionDigits: 1,
    });

    const request = async (path) => {
        const response = await fetch(`${apiBase}${path}`, {
            headers: { Accept: 'application/vnd.github+json' },
        });

        if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
        return response.json();
    };

    document.querySelectorAll('[data-github-user]').forEach(async (card) => {
        try {
            const user = await request(`/users/${card.dataset.githubUser}`);
            card.querySelector('[data-user-name]').textContent = user.name || user.login;
            card.querySelector('[data-user-bio]').textContent = user.bio || 'View profile on GitHub';
            card.querySelector('[data-user-repos]').textContent = numberFormat.format(user.public_repos);
            card.querySelector('[data-user-followers]').textContent = numberFormat.format(user.followers);
            card.querySelector('[data-user-following]').textContent = numberFormat.format(user.following);
        } catch (error) {
            card.classList.add('repo-api-error');
        }
    });

    document.querySelectorAll('[data-github-repo]').forEach(async (card) => {
        const description = card.querySelector('[data-repo-description]');

        try {
            const repo = await request(`/repos/${card.dataset.githubRepo}`);
            description.textContent = repo.description || 'No description provided.';
            card.querySelector('[data-repo-stars]').textContent = numberFormat.format(repo.stargazers_count);
            card.querySelector('[data-repo-forks]').textContent = numberFormat.format(repo.forks_count);
            card.querySelector('[data-repo-visibility]').textContent = repo.visibility || 'Public';
            card.querySelector('[data-repo-updated]').textContent = `Updated ${new Intl.DateTimeFormat(
                document.documentElement.lang || 'en',
                { year: 'numeric', month: 'short' },
            ).format(new Date(repo.updated_at))}`;

            if (repo.language) {
                const language = card.querySelector('[data-repo-language]');
                language.querySelector('span').textContent = repo.language;
                language.hidden = false;
            }
        } catch (error) {
            description.textContent = 'Repository details are temporarily unavailable.';
            card.classList.add('repo-api-error');
        }
    });
});