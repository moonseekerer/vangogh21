export type LetterType = 'vincent_to_theo' | 'theo_to_vincent' | 'to_others';

export interface VanGoghLetter {
  id: string;
  letterNo: string;
  date: string;
  sender: string;
  recipient: string;
  location: string;
  letterType: LetterType;
  title: string;
  summary: string;
  originalLanguage: 'fr' | 'nl';
  originalLanguageLabel: string;
  fullTextOriginal: string;
  fullTextKo: string;
  relatedArtworkIds: string[];
}

export const HISTORICAL_LETTERS: VanGoghLetter[] = [
  {
    id: 'letter-777',
    letterNo: 'Letter 777',
    date: '1889년 6월 2일',
    sender: '빈센트 반 고흐',
    recipient: '동생 테오 반 고흐',
    location: '프랑스 생레미 드 프로방스',
    letterType: 'vincent_to_theo',
    title: '새벽 창문의 샛별과 별이 빛나는 밤',
    summary: '요양원의 쇠창살 너머로 떠오른 거대한 샛별(모닝스타)을 관찰하며 우주적 영감과 영혼의 여정을 동생에게 고백한 편지.',
    originalLanguage: 'fr',
    originalLanguageLabel: '프랑스어 원문',
    fullTextOriginal: `Mon cher Théo,

Ce matin j’ai vu la campagne de ma fenêtre longtemps avant le lever du soleil avec rien que l'étoile du matin, laquelle paraissait très grande. Daubigny et Rousseau ont fait cela pourtant, exprimant tout ce que cela a d’intime, tout ce que cela a de paix et de majesté et y ajoutant un sentiment si déchirant, si personnel. Ce ne sont pas des émotions que j’aie contre ces tableaux-là.

Pour ma part, je ne sais rien de certain, mais la vue des étoiles me fait toujours rêver, aussi simplement que me font rêver les points noirs représentant sur la carte géographique villes et villages.

Pourquoi, me dis-je, les points lumineux du firmament nous seraient-ils moins accessibles que les points noirs sur la carte de France? Si nous prenons le train pour nous rendre à Tarascon ou à Rouen, nous prenons la mort pour aller dans une étoile. Ce qui est certainement vrai dans ce raisonnement, c’est que, vivants, nous ne pouvons pas aller dans une étoile, pas plus que, morts, nous ne pouvons prendre le train.

Enfin, il ne me semble pas impossible que le choléra, la gravelle, la phtisie, le cancer, soient des moyens de locomotion célestes, comme les bateaux à vapeur, les omnibus et le chemin de fer en sont de terrestres. Mourir tranquillement de vieillesse serait y aller à pied.`,
    fullTextKo: `사랑하는 테오에게,

오늘 아침 해가 뜨기 훨씬 전, 나는 창가에 서서 오랫동안 시골 풍경을 바라보았다. 하늘에는 모닝스타(샛별) 외에는 아무것도 없었는데, 그 별은 무척이나 커 보였다. 도비니와 루소는 이 광경이 지닌 아늑함과 평화, 장엄함을 표현하면서도 지극히 가슴 저미고 개인적인 감정을 담아내곤 했지.

확실한 것은 아무것도 알 수 없지만, 별들을 바라볼 때면 나는 언제나 꿈을 꾸게 된다. 지도 위의 도시와 마을을 나타내는 검은 점들을 볼 때 꿈을 꾸는 것처럼 단순하게 말이다.

스스로에게 묻곤 한다. 하늘에서 반짝이는 저 점들에 닿는 일이 지도 위의 검은 점들에 닿는 일보다 왜 더 어려워야 하는가? 우리가 타라스콩이나 루앙으로 가기 위해 기차를 타듯, 우리는 별에 도달하기 위해 죽음을 맞이하는 것이 아닐까? 이 추론에서 확실한 사실 하나는, 살아있는 동안에는 별에 갈 수 없고, 죽은 후에는 기차를 탈 수 없다는 점이다.

콜레라, 결석, 결핵, 암 같은 질병들이 증기선, 옴니버스 마차, 철도처럼 하늘로 향하는 영적 이동 수단일지도 모른다는 생각이 든다. 그리고 늙어서 평온하게 숨을 거두는 것은 그곳을 향해 걸어가는 일과 같겠지.`,
    relatedArtworkIds: ['Q45585']
  },
  {
    id: 'letter-666',
    letterNo: 'Letter 666',
    date: '1888년 8월 21일',
    sender: '빈센트 반 고흐',
    recipient: '동생 테오 반 고흐',
    location: '프랑스 아를',
    letterType: 'vincent_to_theo',
    title: '부야베스를 먹는 열정으로 그린 열두 송이 해바라기',
    summary: '고갱이 아를에 도착했을 때 그의 방을 장식하기 위해 쉬지 않고 노란색의 변주를 실험하며 해바라기를 그린 제작기.',
    originalLanguage: 'fr',
    originalLanguageLabel: '프랑스어 원문',
    fullTextOriginal: `Mon cher Théo,

J’y travaille tous les matins dès le lever du soleil, car les fleurs se fanent vite et il s'agit de faire l'ensemble d'un trait.

J’ai trois toiles en train:
1° 3 grosses fleurs dans un vase vert, fond clair (toile de 15),
2° 3 fleurs, une fleur en graine et effeuillée et un bouton sur fond bleu de roi (toile de 25),
3° 12 fleurs et boutons dans un vase vert (toile de 30).
Cette dernière est donc claire sur fond clair et sera la meilleure, j'espère.

Je peins avec l'entrain d'un Marseillais mangeant la bouillabaisse, ce qui ne t'étonnera pas quand il s'agit de peindre de grands Tournesols.

Si j'exécute ce plan, il y aura une douzaine de panneaux. Le tout formera donc une symphonie en jaune et bleu. J'y travaille tous ces matins-ci. Tu sais que le jeune poète flamand est venu me voir... Dans l'espoir de vivre dans un atelier à nous avec Gauguin, je voudrais faire une décoration pour l'atelier. Rien que de grands Tournesols.`,
    fullTextKo: `사랑하는 테오에게,

나는 매일 아침 해가 뜨자마자 작업을 시작한다. 꽃들이 너무나 빨리 시들어버리기 때문에 단숨에 전체를 그려내야 하기 때문이다.

지금 세 점의 캔버스를 동시에 작업하고 있다.
첫째는 밝은 배경에 초록색 화병에 담긴 세 송이의 큰 해바라기(15호 캔버스),
둘째는 로열블루 배경에 꽃잎이 떨어진 한 송이와 봉오리를 포함한 세 송이(25호 캔버스),
셋째는 초록 화병에 담긴 열두 송이의 꽃과 봉오리(30호 캔버스)다.
마지막 그림은 밝은 배경 위의 밝은 꽃들이며, 내 생각에 가장 훌륭한 작품이 될 것 같다.

나는 지금 마르세유 사람이 부야베스(생선 스튜)를 먹는 열정으로 그림을 그리고 있다. 커다란 해바라기를 그리고 있기 때문이라면 너도 그리 놀라지 않겠지.

이 계획을 온전히 실행한다면 열두 점 남짓의 연작이 완성될 것이다. 전체가 노란색과 파란색의 웅장한 교향곡을 이룰 것이다. 고갱과 함께 우리만의 아틀리에에서 살게 될 희망을 품고, 나는 작업실 전체를 오직 찬란한 해바라기들로만 가득 채우고 싶다.`,
    relatedArtworkIds: ['Q21948567', 'Q26220282']
  },
  {
    id: 'letter-691',
    letterNo: 'Letter 691',
    date: '1888년 9월 28일',
    sender: '빈센트 반 고흐',
    recipient: '동생 테오 반 고흐',
    location: '프랑스 아를',
    letterType: 'vincent_to_theo',
    title: '론강의 밤하늘과 노란 집의 완성',
    summary: '론강 강변에서 가스등 불빛과 북두칠성을 화폭에 담은 서정적 밤 풍경과 남쪽의 아틀리에 노란 집을 묘사한 편지.',
    originalLanguage: 'fr',
    originalLanguageLabel: '프랑스어 원문',
    fullTextOriginal: `Mon cher Théo,

Ci-inclus un petit croquis d'une toile carrée de 30, enfin le ciel étoilé peint la nuit même sous un bec de gaz. Le ciel est bleu vert, l'eau est bleu royal, le terrain est mauve. La ville est bleue et violette, le gaz est jaune et des reflets sont or roux et descendent jusqu'au bronze vert.

Sur le champ bleu vert du ciel, la grande ourse a un scintillement vert et rose, dont la pâleur discrète contraste avec l'or brutal du gaz. Deux petites figurines colorées d'amoureux à l'avant-plan.

Également un croquis d'une toile de 30, la maison et son entourage sous un soleil de soufre, peint en plein soleil également. Le sol est tout en nuances jaunes, soufre pur le ciel. Les maisons sont peintes en jaune, les volets en vert. C'est difficile de peindre cela, mais c'est justement ce qui m'intéresse.`,
    fullTextKo: `사랑하는 테오에게,

30호 정방형 캔버스 스케치를 동봉한다. 마침내 가스등 불빛 아래에서 밤에 현장 작업을 통해 완성한 별이 빛나는 하늘이다. 하늘은 청록색이고, 강물은 짙은 로열블루이며, 강둑은 옅은 자주색이다. 강 건너 도시는 푸른빛과 보라색을 띠고, 가스등 불빛은 노란빛으로 타오르며 물결 위에 붉은 금빛과 청동색 빛줄기를 길게 드리우고 있다.

청록빛 밤하늘 위로 북두칠성이 초록과 장미빛으로 영롱하게 깜빡이고 있는데, 그 은은한 창백함이 지상의 거친 가스등 금빛과 뚜렷한 대조를 이룬다. 전경에는 밤 산책을 나온 연인 두 사람의 작은 형체가 그려져 있다.

또 다른 스케치는 유황빛 태양 아래 선 노란 집과 그 주변 풍경이다. 이것 역시 한낮의 작열하는 태양 아래에서 그렸다. 땅은 온통 노란색의 변주들이고, 하늘은 순수한 유황색이다. 건물들은 밝은 노란색, 창문 덧창은 초록색이다. 그리기 몹시 까다로웠지만, 그것이야말로 나를 강렬하게 사로잡는다.`,
    relatedArtworkIds: ['Q1464531', 'Q2200610']
  },
  {
    id: 'letter-497',
    letterNo: 'Letter 497',
    date: '1885년 4월 30일',
    sender: '빈센트 반 고흐',
    recipient: '동생 테오 반 고흐',
    location: '네덜란드 뉘넌',
    letterType: 'vincent_to_theo',
    title: '감자 먹는 사람들 : 노동의 숭고함에 부쳐',
    summary: '거친 손으로 직접 땅을 판 농민들의 삶을 아카데믹한 미화 없이 거친 흙빛으로 담아낸 최초 걸작의 제작 의도.',
    originalLanguage: 'nl',
    originalLanguageLabel: '네덜란드어 원문',
    fullTextOriginal: `Waarde Theo,

Ziehier dan het croquis van de aardappeleters. Ik heb het er juist op aangelegd dat men een denkbeeld zou krijgen dat die luidjes, die bij hun lampje hun aardappels zitten te eten, met diezelfde handen die zij in den schotel steken, zelve de aarde hebben omgespit, en het spreekt dus van handenarbeid en — dat zij hun eten zoo eerlijk hebben verdiend.

Ik heb gewild dat het zou doen denken aan eene heele andere manier van leven dan de onze — van beschaafde menschen. Ik zou dus ook volstrekt niet wenschen dat iedereen het dadelijk mooi of goed vond.

Het schilderen van het boerenleven is een ernstig ding, en ik zou mijzelven schuldig achten indien ik niet trachtte figuren te maken die herinneringen wekken aan de aarde en het ruwe werk zelve. Men moet de boeren schilderen alsof men er zelf een van was.`,
    fullTextKo: `사랑하는 테오에게,

여기 <감자 먹는 사람들>의 크로키를 보낸다. 나는 등불 밑에서 감자를 먹고 있는 이 사람들이 바로 그 손으로 흙을 파헤쳐 일구었다는 사실을 사람들이 느낄 수 있도록 온 정성을 쏟았다.

그것은 수공 노동에 대한 이야기이며, 그들이 정직하게 땀 흘려 자신의 음식을 얻었다는 가장 명백한 증거다. 나는 이 그림이 교양 있는 도시인들의 삶과는 전혀 다른, 대지와 맞닿은 삶의 방식을 떠올리게 하기를 원했다. 그러므로 모든 사람이 이 그림을 보고 즉시 아름답거나 훌륭하다고 감탄하기를 바라지 않는다.

농민의 삶을 그리는 것은 대단히 엄숙한 일이다. 만약 흙먼지와 거친 노동의 기억을 불러일으키지 못하는 매끄러운 그림을 그린다면 나는 스스로 죄책감을 느낄 것이다. 농민을 그릴 때는 화가 스스로가 농민의 한 사람이 된 것처럼 그려야 한다.`,
    relatedArtworkIds: ['Q154469']
  },
  {
    id: 'letter-705',
    letterNo: 'Letter 705',
    date: '1888년 10월 16일',
    sender: '빈센트 반 고흐',
    recipient: '동생 테오 반 고흐',
    location: '프랑스 아를',
    letterType: 'vincent_to_theo',
    title: '아를의 침실과 단순한 휴식의 색채',
    summary: '노란 집 2층 자신의 침실을 구성하는 단순한 가구와 평면적인 색채 배치를 통해 온전한 마음의 안식을 구하고자 한 편지.',
    originalLanguage: 'fr',
    originalLanguageLabel: '프랑스어 원문',
    fullTextOriginal: `Mon cher Théo,

Enfin je t’envoie un petit croquis pour te donner au moins une idée de la tournure que prend le travail. Car aujourd’hui j’ai remis ça. Mes yeux sont encore fatigués mais enfin j’ai une nouvelle idée en tête et en voici le croquis. Toujours de la toile de 30.

Cette fois c’est simplement ma chambre à coucher, seulement la couleur doit ici faire la chose et en donnant par sa simplification plus de style aux choses, être suggestive ici de repos ou de sommeil en général. Enfin la vue du tableau doit reposer la tête ou plutôt l’imagination.

Les murs sont d’un violet pâle. Le sol est à carreaux rouges. Le bois du lit et les chaises sont jaune beurre frais, le drap et les oreillers citron vert très clair. La couverture rouge écarlate. La fenêtre verte. La table à toilette orangée, la cuvette bleue. Les portes lilas. Et c’est tout — rien dans cette pièce aux volets clos. Le carré des meubles doit exprimer le repos inébranlable.`,
    fullTextKo: `사랑하는 테오에게,

작업이 어떤 방향으로 나아가고 있는지 대략이나마 알 수 있도록 작은 스케치를 보낸다. 오늘 다시 붓을 들었다. 눈은 여전히 피로하지만 머릿속에 새로운 구상이 떠올랐고, 이것이 바로 그 스케치다. 이번에도 30호 캔버스다.

이번 작품은 그저 나의 침실을 보여줄 뿐이다. 여기서는 오직 색채만이 모든 것을 결정해야 한다. 단순화된 색채를 통해 사물에 더 위대한 스타일을 부여하고, 전반적인 휴식이나 잠을 암시해야 한다. 이 그림을 보는 것만으로 머리가 쉬거나, 상상력이 고요한 안식을 얻어야 한다.

벽면은 옅은 보라색이고, 바닥은 붉은 타일이다. 침대의 나무틀과 의자는 신선한 버터 같은 노란색이고, 시트와 베개는 아주 연한 레몬그린이다. 침대보는 선명한 주홍색, 창틀은 초록색, 세면대는 주황색, 대야는 파란색, 문은 라일락색이다. 덧창이 닫힌 이 방에는 그 밖의 다른 것은 아무것도 없다. 네모반듯하고 묵직한 가구들은 흔들리지 않는 절대적인 휴식을 표현해야 한다.`,
    relatedArtworkIds: ['Q18713070', 'Q18543956']
  },
  {
    id: 'letter-898',
    letterNo: 'Letter 898',
    date: '1890년 7월 10일',
    sender: '빈센트 반 고흐',
    recipient: '동생 테오 반 고흐',
    location: '프랑스 오베르 쉬르 우아즈',
    letterType: 'vincent_to_theo',
    title: '험악한 하늘 아래 끝없는 밀밭과 마지막 고백',
    summary: '생애 마지막 달, 폭풍우가 몰아치는 밀밭을 그리며 자신의 극심한 슬픔과 고독을 굳이 숨기지 않고 캔버스에 쏟아낸 절절한 편지.',
    originalLanguage: 'fr',
    originalLanguageLabel: '프랑스어 원문',
    fullTextOriginal: `Mon cher Théo,

De retour ici je me suis remis au travail pourtant — le pinceau me tombant presque des mains et — sachant bien ce que je voulais j’ai encore peint trois grandes toiles depuis. Ce sont d’immenses étendues de blés sous des ciels troublés et je ne me suis pas gêné pour chercher à exprimer de la tristesse, de la solitude extrême. Vous verrez cela j’espère sous peu — car j’espère bien vous les apporter à Paris le plus tôt possible...

Ces toiles vous diront ce que je ne sais dire en paroles, ce que je vois de sain et de fortifiant dans la campagne.

Maintenant — le troisième tableau c’est le jardin de Daubigny, tableau auquel je pensais depuis que je suis ici. Je me sens — un raté — voilà pour mon compte — je sens que c'est là le sort que j'accepte et qui ne changera plus.`,
    fullTextKo: `사랑하는 테오에게,

오베르로 돌아온 뒤 나는 다시 붓을 잡았다. 손에서 붓이 떨어져 나갈 것만 같았지만, 내가 무엇을 그리고 싶은지 명확히 알고 있었기에 그 후로 세 점의 큰 캔버스를 더 완성했다. 그것은 폭풍우가 몰아치는 어둡고 험악한 하늘 아래 끝없이 펼쳐진 거대한 밀밭들이다. 나는 극도의 슬픔과 한계에 다다른 고독을 표현하기 위해 굳이 내 감정을 숨기지 않았다. 머지않아 너희가 이 그림들을 보게 되기를 바란다.

이 그림들은 내가 말로 다 표현하지 못하는 시골 자연의 건강하고 치유하는 생명력을 너에게 전해줄 것이다.

세 번째 그림은 이곳에 온 첫날부터 마음에 품었던 <도비니의 정원>이다. 나는 내 삶이 실패로 끝났음을 느낀다. 이것이 내가 담담히 받아들이는 운명이며, 더 이상 아무것도 바뀌지 않을 것이다.`,
    relatedArtworkIds: ['Q634122']
  },
  {
    id: 'letter-873',
    letterNo: 'Letter 873',
    date: '1890년 5월 21일',
    sender: '테오 반 고흐',
    recipient: '형 빈센트 반 고흐',
    location: '프랑스 파리',
    letterType: 'theo_to_vincent',
    title: '파리 살롱의 호평과 앙데팡당전 소식',
    summary: '오베르에 도착한 빈센트에게 파리 앙데팡당전에서 모네를 비롯한 동료 화가들이 보낸 평가와 가셰 박사와의 만남을 전한 테오의 편지.',
    originalLanguage: 'fr',
    originalLanguageLabel: '프랑스어 원문',
    fullTextOriginal: `Mon cher frère,

Quelle joie nous avons eue de te revoir parmi nous! Tu as l'air tout à fait bien portant et ton séjour à Paris, bien que court, nous a laissé la meilleure impression.

J'ai vu plusieurs personnes qui m'ont parlé de ton exposition aux Indépendants. Monet a dit que tes toiles étaient les plus belles de toute l'exposition. Bien d'autres peintres commencent à comprendre ce que tu cherches. Tu as tracé ta voie, et personne ne peut plus contester ta force.

Le Dr Gachet m'a écrit qu'il t'a trouvé fort sympathique et qu'il fera tout pour que tu te sentes chez toi à Auvers. Travaille tranquillement, sans trop te tourmenter pour l'avenir matériel. Tant que j'aurai un morceau de pain, tu en auras la moitié.`,
    fullTextKo: `사랑하는 형에게,

우리 곁으로 다시 돌아온 형을 보았을 때 우리가 얼마나 큰 기쁨을 느꼈는지 모를 거야! 형은 무척 건강해 보였고, 비록 짧은 파리 체류였지만 우리에게 더없이 따뜻한 인상을 남겼어.

앙데팡당전에 출품된 형의 그림을 본 많은 사람들을 만났어. 클로드 모네는 형의 작품들이 이번 전시 전체를 통틀어 가장 아름다운 그림이라고 말했어. 이제 수많은 화가들이 형이 추구해 온 예술의 본질을 진정으로 이해하기 시작했어. 형은 자신만의 길을 개척했고, 이제 그 누구도 형의 위대한 힘을 부정할 수 없어.

가셰 박사님이 내게 편지를 보내왔는데, 형에게 깊은 호감을 느꼈으며 형이 오베르에서 내 집처럼 편안하게 머물 수 있도록 온 힘을 다하겠다고 약속했어. 물질적인 미래에 대해 너무 고뇌하지 말고 마음 편히 작업에 전념해. 내게 빵 한 조각이 남아있는 한, 그 절반은 언제나 형의 몫이니까.`,
    relatedArtworkIds: ['Q843044', 'Q1213917']
  },
  {
    id: 'letter-781',
    letterNo: 'Letter 781',
    date: '1889년 6월 16일',
    sender: '테오 반 고흐',
    recipient: '형 빈센트 반 고흐',
    location: '프랑스 파리',
    letterType: 'theo_to_vincent',
    title: '아를과 생레미 신작 회화에 부쳐',
    summary: '생레미에서 보낸 캔버스를 풀어본 테오가 형의 색채와 형태가 도달한 조형적 깊이에 관해 서술한 서신.',
    originalLanguage: 'fr',
    originalLanguageLabel: '프랑스어 원문',
    fullTextOriginal: `Mon cher Vincent,

J'ai bien reçu la caisse de toiles que tu m'as envoyée d'Arles et de Saint-Rémy. Mon Dieu, quelle puissance dans ces nouvelles toiles! Il y a une force de couleur et une simplicité de forme que tu n'avais jamais atteintes auparavant.

Jo et moi les regardons chaque soir. Le ciel de nuit avec les tourbillons d'étoiles a quelque chose qui dépasse la peinture ordinaire — on dirait que tu as réussi à peindre l'infini. Ne doute jamais de toi-même, mon cher frère. Ton travail portera ses fruits, même si le monde met du temps à ouvrir les yeux.

Prends grand soin de toi et continue à m'écrire aussi souvent que tu le pourras. Ta lettre m'a fait un bien immense.`,
    fullTextKo: `사랑하는 빈센트 형에게,

형이 아를과 생레미에서 보낸 그림 상자를 무사히 받았어. 세상에, 이 새로운 캔버스들에 담긴 힘이 얼마나 경이로운지! 이전에는 도달하지 못했던 색채의 압도적인 위력과 형태의 순수한 단순함이 살아 숨 쉬고 있어.

요한나와 나는 매일 밤 형의 그림들을 경외감 속에 바라보고 있어. 별들이 소용돌이치는 밤하늘은 평범한 회화의 한계를 아득히 뛰어넘었어. 마치 형이 우주의 무한 그 자체를 캔버스에 붙잡아둔 것만 같아. 결코 형 자신을 의심하지 마. 세상이 눈을 뜨는 데는 시간이 걸리겠지만, 형의 작업은 반드시 위대한 열매를 맺을 거야.

몸조리 잘하고 가능한 한 자주 소식을 전해줘. 형의 편지는 내게 언제나 가장 큰 위안이자 구원이야.`,
    relatedArtworkIds: ['Q45585', 'Q867510']
  },
  {
    id: 'letter-678',
    letterNo: 'Letter 678',
    date: '1888년 9월 9일',
    sender: '빈센트 반 고흐',
    recipient: '여동생 빌레미나 반 고흐',
    location: '프랑스 아를',
    letterType: 'to_others',
    title: '밤의 색채와 카페 테라스에 관하여',
    summary: '검은색을 전혀 쓰지 않고 오직 푸른색과 보라색, 타오르는 가스등의 노란빛만으로 밤을 그리는 희열을 동생에게 고백한 편지.',
    originalLanguage: 'fr',
    originalLanguageLabel: '프랑스어 원문',
    fullTextOriginal: `Ma chère sœur,

J'ai été interrompu précisément par le travail qu'un nouveau tableau représentant l'extérieur d'un café le soir me donne depuis quelques jours. Sur la terrasse il y a de petites figurines de buveurs. Une immense lanterne jaune éclaire la terrasse, la devanture, le trottoir, et projette même une lumière sur les pavés de la rue qui prend une teinte de violet rose.

Les pignons des maisons d'une rue qui s'éloigne sous un ciel bleu parsemé d'étoiles sont bleu foncé ou violets avec un arbre vert.

Voilà un tableau de nuit sans noir, rien qu'avec du beau bleu et du violet et du vert et dans cet entourage la place éclairée se colore de soufre pâle, de citron vert. Cela m'amuse énormément de peindre la nuit sur place. Autrefois on dessinait et peignait le tableau le jour d'après le dessin. Mais moi je m'en trouve bien de peindre la chose immédiatement.`,
    fullTextKo: `사랑하는 동생 빌에게,

며칠 전부터 밤의 카페 야외 풍경을 그리는 새로운 작업에 완전히 몰두해 있었단다. 카페 테라스에는 작은 술손님들의 실루엣이 보이고, 거대한 노란 가스등이 테라스와 카페 정면, 보도를 환하게 비추며 자갈길 위로 분홍빛이 감도는 보라색 그림자를 드리우고 있어.

별들이 흩뿌려진 푸른 밤하늘 아래로 멀어지는 거리의 집들은 짙은 파란색과 보라색이고 그 옆에 싱그러운 초록 나무 한 그루가 서 있단다.

검은색을 전혀 쓰지 않고 오직 아름다운 파란색, 보라색, 초록색만으로 그린 밤 풍경이란다. 그리고 이 색채들의 둘레 안에서 불 밝힌 광장은 창백한 유황빛과 레몬그린으로 타오르고 있지. 밤에 현장에서 직접 그림을 그리는 일은 나를 엄청나게 매료시킨단다. 예전에는 낮에 스케치를 하고 나중에 그림을 그렸지만, 나는 그 자리에서 즉시 화폭에 담는 것이 훨씬 마음에 들어.`,
    relatedArtworkIds: ['Q1025704']
  }
];
