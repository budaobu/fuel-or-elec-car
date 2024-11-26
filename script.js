const mileageOptions = [
    { value: "less-10k", label: "小于1万公里", score: 0 },
    { value: "10k-20k", label: "1万-2万公里", score: 1 },
    { value: "20k-30k", label: "2万-3万公里", score: 2 },
    { value: "more-30k", label: "3万以上公里", score: 3 },
];

const chargingOptions = [
    { value: "no-charger", label: "家里不能装充电桩", score: 0 },
    { value: "public-charger", label: "通勤地点有公共桩", score: 1 },
    { value: "home-charger", label: "家里能装充电桩", score: 2 },
    { value: "company-charger", label: "公司充电桩免费", score: 3 },
];

const usageOptions = [
    { value: "highway", label: "高速为主", score: 0 },
    { value: "mixed", label: "高速市区各一半", score: 1 },
    { value: "city-highway", label: "市区为主偶尔高速", score: 2 },
    { value: "city-only", label: "只跑市区", score: 3 },
];

const cityOptions = [
    { value: "remote", label: "新疆西藏不包邮地区", score: 0 },
    { value: "north", label: "东北内蒙西北地区", score: 1 },
    { value: "other", label: "其他非一线城市", score: 2 },
    { value: "tier-1", label: "一线城市", score: 3 },
];

const purchaseOptions = [
    { value: "first", label: "首购", score: 1 },
    { value: "replace", label: "换购", score: 2 },
    { value: "additional", label: "增购", score: 3 },
];

const scores = {
    mileage: -1,
    charging: -1,
    usage: -1,
    city: -1,
    purchase: -1,
};

function createRadioGroup(options, groupName, container) {
    options.forEach(option => {
        const label = document.createElement('label');
        label.className = 'flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent';
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = groupName;
        input.value = option.value;
        input.addEventListener('change', () => updateScore(groupName, option.score));
        
        const span1 = document.createElement('span');
        span1.textContent = option.label;
        
        const span2 = document.createElement('span');
        span2.className = 'ml-auto text-muted-foreground';
        span2.textContent = option.score + '分';
        
        label.appendChild(input);
        label.appendChild(span1);
        label.appendChild(span2);
        container.appendChild(label);
    });
}

function updateScore(category, score) {
    scores[category] = score;
    updateResult();
}

function updateResult() {
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    if (totalScore >= 0) {
        const recommendation = getRecommendation(totalScore);
        document.getElementById('recommendation').textContent = recommendation.text;
        document.getElementById('recommendation').className = `text-2xl font-bold ${recommendation.color}`;
        document.getElementById('totalScore').textContent = `总分：${totalScore} 分`;
        document.getElementById('result').classList.remove('hidden');
    }
}

function getRecommendation(score) {
    if (score <= 6) return { text: "推荐购买油车", color: "text-yellow-600 dark:text-yellow-400" };
    if (score < 11) return { text: "推荐购买电车", color: "text-green-600 dark:text-green-400" };
    return { text: "强烈推荐购买电车", color: "text-blue-600 dark:text-blue-400" };
}

document.addEventListener('DOMContentLoaded', () => {
    createRadioGroup(mileageOptions, 'mileage', document.getElementById('mileageOptions'));
    createRadioGroup(chargingOptions, 'charging', document.getElementById('chargingOptions'));
    createRadioGroup(usageOptions, 'usage', document.getElementById('usageOptions'));
    createRadioGroup(cityOptions, 'city', document.getElementById('cityOptions'));
    createRadioGroup(purchaseOptions, 'purchase', document.getElementById('purchaseOptions'));
});

